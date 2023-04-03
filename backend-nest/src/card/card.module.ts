import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Card, CardSchema } from './schemas/card.schema';
import { IsUserExists } from 'src/common/decorators/user.exists.decorator';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    UserModule,
  ],
  providers: [CardService, IsUserExists],
  controllers: [CardController],
})
export class CardModule {}
