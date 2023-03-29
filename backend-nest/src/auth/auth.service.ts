import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './auth.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: any): Promise<any> {
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }
}
