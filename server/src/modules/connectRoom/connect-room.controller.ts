import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConnectRoomService } from './connect-room.service';

@Controller('room')
export class ConnectRoomController {
    constructor (private readonly ConnectRoomService: ConnectRoomService) {}
    @ApiTags('Room')
    @Put('lobbiCurrent/:id')
    updateCurrent(
        @Param('id') id: number,
        @Body() body: { 
            action: 'descrement' | 'increment',
            userId: number
         }
    ){
    return this.ConnectRoomService.updateCurrent(id, body.action, body.userId)
    }

    @ApiTags('Room')
    @Get('getUserLobbi/:id')
    getUsersForLobby(@Param('id') id: number){
        return this.ConnectRoomService.getUsersForLobby(id)
    }
}
