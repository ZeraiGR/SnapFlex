import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CardDocument } from './schemas/card.schema';
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './dto';
import { IdValidationPipe } from 'src/common/pipes/id.validation.pipe';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getAll() {
    return await this.cardService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: string) {
    return await this.cardService.getById(id);
  }

  @Get('user/:id')
  async getAllByUserId(@Param('id', IdValidationPipe) id: string) {
    return await this.cardService.getAllByUserId(id);
  }

  @Get('user/available/:id')
  async getAllAvailableByUserId(@Param('id', IdValidationPipe) id: string) {
    return await this.cardService.getAllAvailableByUserId(id);
  }

  @Post('create')
  async createCard(@Body() dto: CreateCardDto): Promise<CardDocument> {
    console.log(dto);
    return await this.cardService.create(dto);
  }

  @Patch(':id')
  async updatePatch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateCardDto,
  ) {
    return this.cardService.update(id, dto);
  }

  @Patch(':id/success')
  async updateSuccess(@Param('id', IdValidationPipe) id: string) {
    return this.cardService.successUpdate(id);
  }

  @Patch(':id/failure')
  async updateFailure(@Param('id', IdValidationPipe) id: string) {
    return this.cardService.failureUpdate(id);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.cardService.delete(id);
  }
}
