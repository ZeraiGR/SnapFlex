import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';

import { Training } from 'src/training/training.chema';
import { Card } from 'src/card/schemas/card.schema';
import { UserRole } from '../types';

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
    type: [{ type: [{ type: Types.ObjectId, ref: Card.name }], default: [] }],
  })
  @Type(() => Card)
  cards: Card[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: Training.name, default: [] }],
  })
  @Type(() => Training)
  trainings: Training;
}

export const UserSchema = SchemaFactory.createForClass(User);
