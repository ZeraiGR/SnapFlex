import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { AtGuard } from './common/guards';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    TrainingModule,
    CardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
