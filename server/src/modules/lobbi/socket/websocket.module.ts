import { Module } from '@nestjs/common';
import { LobbyListGateway } from './lobbyList.gateway';

@Module({
  providers: [LobbyListGateway],
  exports: [LobbyListGateway]
})
export class WebsocketModule {}
