import {
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon from 'argon2';

import { User, UserDocument } from '../user/user.schema';
import { SigninDto, SignupDto } from './dto';
import { ARGON_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './types';
import { USER_NOT_FOUNT_ERROR } from 'src/user/user.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signupLocal({
    email,
    username,
    password,
    dateOfBirch,
  }: SignupDto): Promise<Tokens> {
    const passwordHash = await this.hashValue(password);

    const user = await this.createUser(
      { email, username, dateOfBirch },
      passwordHash,
    );

    const tokens = await this.getTokens(user._id, user.username);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: SigninDto): Promise<Tokens> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new ForbiddenException(USER_NOT_FOUNT_ERROR);

    const passwordMatches = await this.compareHashValue(
      user.hash,
      dto.password,
    );

    if (!passwordMatches) throw new ForbiddenException(WRONG_PASSWORD_ERROR);

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.usersService.findById(userId);

    if (!user || !user.hashedRt)
      throw new ForbiddenException(USER_NOT_FOUNT_ERROR);

    const passwordMatches = await this.compareHashValue(user.hash, rt);

    if (!passwordMatches) throw new ForbiddenException(WRONG_PASSWORD_ERROR);

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate(
      userId,
      { hashedRt: null },
      { new: true },
    );
    return true;
  }

  async createUser(
    dto: Omit<SignupDto, 'password' | 'passwordConfirm'>,
    passwordHash: string,
  ): Promise<any> {
    // todo: correct returned type
    return new this.userModel({
      ...dto,
      passwordHash,
    });
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hashedRt = await this.hashValue(rt);
    await this.userModel.findByIdAndUpdate(userId, { hashedRt }, { new: true });
  }

  async getTokens(userId: string, username: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async hashValue(value: string): Promise<string> {
    let res = null;

    try {
      res = await argon.hash(value);
    } catch (error) {
      // send error to logger
      throw new ServiceUnavailableException(ARGON_ERROR);
    }

    return res;
  }

  async compareHashValue(hash: string, value: string): Promise<boolean> {
    let res;

    try {
      res = await argon.verify(hash, value);
    } catch (error) {
      // send error to logger
      throw new ServiceUnavailableException(ARGON_ERROR);
    }

    return res;
  }
}
