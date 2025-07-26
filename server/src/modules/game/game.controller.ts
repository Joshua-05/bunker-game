import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGameDTO } from './dto/CreateGame';
import { LeavePlayerDTO } from './dto/LeavePlayer';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService){}

    @ApiTags('Games')
    @ApiResponse({ status: 201})
    @HttpCode(201)
    @Post('create')
    create(@Body() dto: CreateGameDTO){
        return this.gameService.createGame(dto)
    }

    @ApiTags('Games')
    @ApiResponse({ status: 201})
    @HttpCode(201)
    @Post('leave')
    leave(@Body() dto: LeavePlayerDTO){
        return this.gameService.leavePlayer(dto)
    }
}
