import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './models/game.model';
import { Player } from './models/player.model';
import { CreateGameDTO } from './dto/CreateGame';
import { CardService } from '../card/card.service';
import { LeavePlayerDTO } from './dto/LeavePlayer';
import { Card } from '../card/models/card.model';

@Injectable()
export class GameService {
    constructor (
        @InjectModel(Game) private readonly gameRepository : typeof Game,
        @InjectModel(Player) private readonly playerRepository : typeof Player,
        private readonly cardRepository: CardService
    ) {}

    async initPlayer(playerData : {userId: number, username: string, id_game: string}){
        // const cardList = await this.cardRepository.dealingCards()
        const [player, created] = await this.playerRepository.findOrCreate({
            where: {
                userId : playerData.userId,
                username: playerData.username,
            },
            defaults: {
                gameId : playerData.id_game,
                username: playerData.username, 
                userId : playerData.userId,
                state: 'plays'
            }
        })
        if (created) {
            console.log('Создаем нового игрока и даем ему карты');
            if (!player.cards) {
                player.cards = [];
            }
            const cardList = await this.cardRepository.dealingCards();
            player.cards.push(...cardList);
            await player.save();
        }
        console.log('Игрок уже существует, просто возвращаем его');
        return player;
    }

    async createGame(dto : CreateGameDTO){
        console.log('_________________________________________________________________________');
        const playerData = {
            userId: dto.userId,
            username: dto.username,
            id_game: dto.id_game,
        }
        const [game, created] = await this.gameRepository.findOrCreate({
            where : {id : dto.id_game},
            defaults: { 
                id: dto.id_game,
                name: dto.name,
                status: 'play',
                count: dto.count,
                players: []
            }
        })

        if (!game.players) {
            game.players = [];
        }

        // console.log('Game data:', game);
        // console.log('Players in game before adding:', game.players);

        if (created) {
            console.log('игра создается');
            
            const player = await this.initPlayer(playerData)
            console.log('впервые регаем его, он первый');
            game.players.push(player)
            await game.save()
            // console.log('Players in game before adding222222:', game.players);
            return player.cards
        } else {
            const existingPlayer = game.players.find(player => player.userId === dto.userId);
        
            console.log('Checking for userId:', game.players);
            if (existingPlayer) {
                console.log('В игре уже есть такой игрок, возвращаем его карты');
                return existingPlayer.cards
            }
                      
            if (game.players.length >= game.count) {
                console.log('Игрок не будет в этой игре');
                throw new BadRequestException('Тут уже все кто нужно');
            }         
            
            const player = await this.initPlayer(playerData);
            console.log('Регаем игрока');
            game.players.push(player);
            await game.save();
            // console.log('Players in game before adding3333:', game.players);

            console.log('_____________________________________________________________________________________________');
            return player.cards;
        }
    }

    async leavePlayer(dto: LeavePlayerDTO){
        const player = await this.playerRepository.findOne({
            where: { userId: dto.userId }
        });
    
        if (!player) {
            throw new BadRequestException('Игрок не найден');
        }
    
        await this.playerRepository.destroy({
            where: { userId: dto.userId }
        });
        console.log(`Игрок с userId ${dto.userId} был удален.`);
    }
}
