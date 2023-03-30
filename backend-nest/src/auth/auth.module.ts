import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/user.schema';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { RtStrategy, AtStrategy } from './strategies';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
