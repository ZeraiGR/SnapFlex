import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CardCategory, CardChar, RepeatedCount } from '../types';

@Schema()
export class Card {
  @Prop()
  front: string;

  @Prop()
  back: string;

  @Prop({ type: String, enum: CardCategory })
  category: CardCategory;

  @Prop()
  lastRepeatedAt: Date;

  @Prop({ default: 0 })
  repeatedCount: number;

  // For evaluating difficulty status of card
  @Prop({ default: 1 })
  value: number;

  @Prop({ type: String, enum: RepeatedCount })
  repeatedStatus: RepeatedCount;

  @Prop({ default: true })
  isAvailable: boolean;

  // todo: set chars
  // @Prop()
  // characteristics: CardChar[];
}
export const CardSchema = SchemaFactory.createForClass(Card);
