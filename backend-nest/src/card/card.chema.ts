import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true, collection: 'cards' })
export class Card {}

export const CardSchema = SchemaFactory.createForClass(Card);
