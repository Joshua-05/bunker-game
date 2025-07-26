import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lobbi } from '../lobbi/models/lobbi.model';
import { LobbyListGateway } from '../lobbi/socket/lobbyList.gateway';
import { User } from '../user/models/user.model';
import { ChatGateway } from './socket/chat.gateway';

@Injectable()
export class ConnectRoomService {
    constructor (
        @InjectModel(Lobbi) private readonly lobbiRepository: typeof Lobbi,
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly lobbyListGateway: LobbyListGateway
    ){}

    async updateCurrent(id: number, action: 'descrement' | 'increment', userId: number){
        const lobbi = await this.lobbiRepository.findOne({
            where: {id: id},
        });
        const user = await this.userRepository.findByPk(userId)

        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }

        if (!lobbi.users) {
            lobbi.users = []
        }

        switch(action){
            case 'increment':
                const exist = await this.userRepository.findOne({where: {id : userId, lobbyId : id}})
                if (exist){
                    return lobbi
                }
                if (!exist && lobbi.current < lobbi.count){
                    await this.userRepository.update(
                        {lobbyId: id}, 
                        {where : {id : userId }} 
                    )
                    lobbi.current += 1
                    await lobbi.users.push(user)
                    await lobbi.save()
                    this.lobbyListGateway.server.emit('lobbyUpdated', lobbi);
                    return lobbi
                }
                else {
                    throw new NotFoundException(`Lobby with ID ${id} full limit`)
                }
            case 'descrement':
                await this.userRepository.update(
                    {lobbyId: null},
                    {where : {id : userId, lobbyId: id}}
                )
                lobbi.current -= 1
                await lobbi.$remove('users', user)
                if (lobbi.current === 0){
                    this.lobbyListGateway.server.emit('lobbyDeleted', lobbi.id)
                    await lobbi.destroy()
                    return { message: "Lobby deleted" }
                }
                await lobbi.save()
                this.lobbyListGateway.server.emit('lobbyUpdated', lobbi);
                return lobbi
        }
    }

    async getUsersForLobby(lobbyId: number) {
        const users = await this.lobbiRepository.findOne({
            where: { id : lobbyId },
            include: [User],
        });
    
        if (!users) {
            throw new NotFoundException(`No users found for lobby ID ${lobbyId}`);
        }
        
        return users.users; 
    }
}
