
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { User } from '../users/entity/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, User]),
  ],
  controllers: [CardController],
  providers: [CardService,UsersService],
})
export class CardModule {}
