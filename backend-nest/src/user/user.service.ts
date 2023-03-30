import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  // todo: Correct returned type
  async findById(id: string): Promise<any | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
