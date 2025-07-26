import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService){}

    @ApiTags('Cards')
    @ApiResponse({ status: 201, type: CreateCardDTO })
    @HttpCode(201)
    @Post('create')
    create(@Body() dto: CreateCardDTO): Promise<CreateCardDTO>{
        return this.cardService.createCard(dto)
    }

    @ApiTags('Cards')
    @ApiResponse({ status: 200 })
    @HttpCode(200)
    @Get('getAll')
    getAll(){
        return this.cardService.findAllCard()
    }

    @ApiTags('Cards')
    @ApiResponse({ status: 200 })
    @HttpCode(200)
    @Get('getCollection')
    getCollection(){
        return this.cardService.dealingCards()
    }
    
}
