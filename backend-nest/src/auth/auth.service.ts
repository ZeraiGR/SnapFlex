import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.schema';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signupLocal(dto: SignupDto) {
    // code...
  }

  async signinLocal(dto: SigninDto) {
    // code...
  }

  async refreshTokens(dto: SigninDto) {
    // code
  }

  async logout() {
    // code...
  }
}
