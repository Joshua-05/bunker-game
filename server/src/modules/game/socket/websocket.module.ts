import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';

@Module({
  providers: [GameGateway],
  exports: []
})
export class WebsocketModule {}
