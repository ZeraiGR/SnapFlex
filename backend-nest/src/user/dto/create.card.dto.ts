import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { CardCategory } from '../types';
import {
  INCORRECT_CATEGORY_ERROR,
  IS_NOT_EMPTY_ERROR,
  IS_NOT_STRING_ERROR,
} from '../user.constants';

const categories = ['word', 'sentence', 'equation'] as const;

export class CreateCardDto {
  @IsString({ message: IS_NOT_STRING_ERROR })
  @IsNotEmpty({ message: IS_NOT_EMPTY_ERROR })
  front: string;

  @IsString({ message: IS_NOT_STRING_ERROR })
  @IsNotEmpty({ message: IS_NOT_EMPTY_ERROR })
  back: string;

  @IsIn(categories, { message: INCORRECT_CATEGORY_ERROR })
  category: CardCategory;
}
