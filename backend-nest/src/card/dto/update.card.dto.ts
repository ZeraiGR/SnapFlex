import { IsIn, IsOptional, IsString } from 'class-validator';

import {
  INCORRECT_CATEGORY_ERROR,
  IS_NOT_STRING_ERROR,
} from '../card.constants';
import { CardCategory } from '../types';

const categories = ['word', 'sentence', 'equation'] as const;

export class UpdateCardDto {
  @IsOptional()
  @IsString({ message: IS_NOT_STRING_ERROR })
  front?: string;

  @IsOptional()
  @IsString({ message: IS_NOT_STRING_ERROR })
  back?: string;

  @IsOptional()
  @IsIn(categories, { message: INCORRECT_CATEGORY_ERROR })
  category?: CardCategory;
}
