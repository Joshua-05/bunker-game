import { Module } from '@nestjs/common';
import { ConnectRoomService } from './connect-room.service';
import { ConnectRoomController } from './connect-room.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lobbi } from '../lobbi/models/lobbi.model';
import { User } from '../user/models/user.model';
import { WebsocketModule } from './socket/websocket.module';
import { LobbyListGateway } from '../lobbi/socket/lobbyList.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Lobbi, User]), WebsocketModule],
  providers: [ConnectRoomService, LobbyListGateway],
  controllers: [ConnectRoomController]
})
export class ConnectRoomModule {}
