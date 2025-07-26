import { Injectable, NotFoundException } from '@nestjs/common';
import { Lobbi } from './models/lobbi.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLobbiDTO } from './dto';
import { User } from '../user/models/user.model';
import { LobbyListGateway } from 'src/modules/lobbi/socket/lobbyList.gateway';

@Injectable()
export class LobbiService {
    constructor(
        @InjectModel(Lobbi) private readonly lobbiRepository: typeof Lobbi,
        
        private readonly lobbyListGateway: LobbyListGateway
    ){}

    async createLobbi(dto: CreateLobbiDTO): Promise<CreateLobbiDTO>{
        const lobbi = await this.lobbiRepository.create({
            name: dto.name,
            current: dto.current,
            count: dto.count,
            access: dto.access,
            password: dto.password,
            users: []
        });
        const lobbys = await this.lobbiRepository.findAll()
        this.lobbyListGateway.server.emit('lobbyCreated', lobbys)
        return lobbi;
    }
    async findAllLobbi(){
        return this.lobbiRepository.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    }
    async findOneLobbi(id: number){
        const lobbi = await this.lobbiRepository.findOne({where: {id: id}});
        if(!lobbi){
            throw new NotFoundException(`Lobby with ID ${id} not found`);
        }
        return lobbi;  
    }
}
