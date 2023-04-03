import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Card, CardDocument } from './schemas/card.schema';
import {
  CARD_IS_NOT_AVAILABLE_ERROR,
  CARD_NOT_FOUNT_ERROR,
} from './card.constants';
import { CreateCardDto, UpdateCardDto } from './dto';
import { RepeatedCount } from './types';
import { updateRepeatedStatus } from 'src/utils/update.repeated.status';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<CardDocument>,
  ) {}

  async getAll(): Promise<CardDocument[]> {
    return this.cardModel.find().exec();
  }

  async getAllByUserId(userId: string): Promise<CardDocument[]> {
    return this.cardModel.find({ userId }).exec();
  }

  async getAllAvailableByUserId(userId: string): Promise<CardDocument[]> {
    return this.cardModel.find({ userId, isAvailable: true }).exec();
  }

  async getById(id: string): Promise<CardDocument | null> {
    return this.cardModel.findById(id).exec();
  }

  async create(dto: CreateCardDto): Promise<CardDocument> {
    return this.cardModel.create(dto);
  }

  async update(id: string, dto: UpdateCardDto): Promise<CardDocument> {
    const updatedCard = await this.cardModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatedCard) throw new NotFoundException(CARD_NOT_FOUNT_ERROR);
    return updatedCard;
  }

  async successUpdate(id: string): Promise<true> {
    const updatedCard = await this.cardModel.findById(id);
    if (!updatedCard) throw new NotFoundException(CARD_NOT_FOUNT_ERROR);

    if (!updatedCard.isAvailable)
      throw new BadRequestException(CARD_IS_NOT_AVAILABLE_ERROR);

    const currentRepeatedStatus = updatedCard.repeatedStatus;

    updatedCard
      .updateOne(
        {
          lastRepeatedAt: new Date(),
          $inc: { repeatedCount: 1 },
          repeatedStatus: updateRepeatedStatus(currentRepeatedStatus),
          isAvailable: false,
        },
        { new: true },
      )
      .exec();

    return true;
  }

  async failureUpdate(id: string): Promise<true> {
    const updatedCard = await this.cardModel.findById(id);
    if (!updatedCard) throw new NotFoundException(CARD_NOT_FOUNT_ERROR);

    if (!updatedCard.isAvailable)
      throw new BadRequestException(CARD_IS_NOT_AVAILABLE_ERROR);

    updatedCard
      .updateOne(
        {
          lastRepeatedAt: new Date(),
          $inc: { repeatedCount: 1, value: 1 },
          repeatedStatus: RepeatedCount.FIRST,
        },
        { new: true },
      )
      .exec();

    return true;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async updateCardsAvailableStatus() {
    const cards = await this.cardModel.find({ isAvailable: false }).exec();

    for (const card of cards) {
      const passedTime = new Date().getTime() - card.lastRepeatedAt.getTime();
      const curStatusTime = card.repeatedStatus * 1000;

      if (passedTime > curStatusTime)
        await card.updateOne({ isAvailable: true });
    }
  }

  async delete(id: string): Promise<Types.ObjectId> {
    const deletedCard = await this.cardModel.findByIdAndRemove(id).exec();
    if (!deletedCard) throw new NotFoundException(CARD_NOT_FOUNT_ERROR);
    return deletedCard._id;
  }
}
