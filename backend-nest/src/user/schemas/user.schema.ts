import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Training } from 'src/training/training.chema';
import { UserRole } from '../types';
import { Card } from '.';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  passwordHash: string;

  @Prop()
  hashedRt: string;

  @Prop({ default: 0 })
  repeatedCardsCnt: number;

  @Prop({ default: UserRole.Student })
  role: UserRole;

  @Prop({
    type: [{ type: [{ type: Card }], default: [] }],
  })
  cards: Card[];

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Training', default: [] },
    ],
  })
  trainings: Training[];
}

export const UserSchema = SchemaFactory.createForClass(User);
