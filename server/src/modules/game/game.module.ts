import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './models/game.model';
import { Player } from './models/player.model';
import { CardModule } from '../card/card.module';

@Module({
  imports: [SequelizeModule.forFeature([Game, Player]), CardModule],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
