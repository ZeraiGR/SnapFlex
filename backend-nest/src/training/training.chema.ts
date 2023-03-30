import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TrainingDocument = HydratedDocument<Training>;

@Schema({ timestamps: true, collection: 'cards' })
export class Training {}

export const TrainingSchema = SchemaFactory.createForClass(Training);
