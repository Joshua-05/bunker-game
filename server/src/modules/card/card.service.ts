import { Injectable } from '@nestjs/common';
import { Card } from './models/card.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCardDTO } from './dto';

@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card) private readonly cardRepository: typeof Card
    ){}

    async createCard(dto: CreateCardDTO): Promise<CreateCardDTO>{
        const card = await this.cardRepository.create({
            type: dto.type,
            name: dto.name,
            importance: dto.importance,
            descripton: dto.descripton,
            combination: []
        });
        return card;
    }

    async findAllCard(): Promise<CreateCardDTO[]>{
        return this.cardRepository.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    }

    async dealingCards() {
        const cardTypes = {
            "Пол": 1,
            "Возраст": 1,
            "Профессия": 1,
            "Здоровья": 1,
            "Хобби": 1,
            "Фобия": 1,
            "Багаж": 1,
            "Факт": 2
        };
        const selectedCards: Card[] = [];
        
        for (const [type, count] of Object.entries(cardTypes)) {
            const cards = await this.cardRepository.findAll({
                where: { type }
            });
            
            if (cards.length > 0) {
                const shuffled = cards.sort(() => 0.5 - Math.random());
                const randomCards = shuffled.slice(0, count);
                selectedCards.push(...randomCards);
            }
        }

        return selectedCards
    }
}
