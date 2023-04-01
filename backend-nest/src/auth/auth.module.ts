import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { RtStrategy, AtStrategy } from './strategies';
import {
  IsEmailNotRegistered,
  IsUsernameNotRegistered,
} from 'src/common/decorators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    IsEmailNotRegistered,
    IsUsernameNotRegistered,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
