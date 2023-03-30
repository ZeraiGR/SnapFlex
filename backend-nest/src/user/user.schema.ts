import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Card } from 'src/card/card.chema';
import { Training } from 'src/training/training.chema';
import { UserRole } from '../auth/types';

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
  exp: number;

  @Prop({ default: UserRole.Student })
  role: UserRole;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] })
  cards: Card[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Training' }] })
  trainings: Training[];
}

export const UserSchema = SchemaFactory.createForClass(User);
