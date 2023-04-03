import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

// import { CardChar } from '../../user/types';
import { User } from 'src/user/schemas';
import { CardCategory, RepeatedCount } from '../types';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {
  @Prop({ type: Types.ObjectId, ref: 'users' })
  @Type(() => User)
  userId: User;

  @Prop()
  front: string;

  @Prop()
  back: string;

  @Prop({ type: String })
  category: CardCategory;

  @Prop({ type: Date })
  lastRepeatedAt: Date;

  @Prop({ default: 0 })
  repeatedCount: number;

  // For evaluating the difficulty status of card
  @Prop({ default: 1 })
  value: number;

  @Prop({ type: Number, enum: RepeatedCount, default: RepeatedCount.FIRST })
  repeatedStatus: RepeatedCount;

  @Prop({ default: true })
  isAvailable: boolean;

  // todo: set chars
  // @Prop()
  // characteristics: CardChar[];
}
export const CardSchema = SchemaFactory.createForClass(Card);
