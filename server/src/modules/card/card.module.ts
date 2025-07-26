import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { Combination } from './models/combination.model';

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService]
})
export class CardModule {}
