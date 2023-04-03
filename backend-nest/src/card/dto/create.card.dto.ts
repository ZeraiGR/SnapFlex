import { IsIn, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { UserExists } from 'src/common/decorators/user.exists.decorator';
import {
  ID_IS_NOT_CORRECT_ERROR,
  INCORRECT_CATEGORY_ERROR,
  IS_NOT_EMPTY_ERROR,
  IS_NOT_STRING_ERROR,
  USER_NOT_FOUND_ERROR,
} from '../card.constants';
import { CardCategory } from '../types';

const categories = ['word', 'sentence', 'equation'] as const;

export class CreateCardDto {
  @IsMongoId({ message: ID_IS_NOT_CORRECT_ERROR })
  @IsNotEmpty({ message: IS_NOT_EMPTY_ERROR })
  @UserExists({ message: USER_NOT_FOUND_ERROR })
  userId: string;

  @IsString({ message: IS_NOT_STRING_ERROR })
  @IsNotEmpty({ message: IS_NOT_EMPTY_ERROR })
  front: string;

  @IsString({ message: IS_NOT_STRING_ERROR })
  @IsNotEmpty({ message: IS_NOT_EMPTY_ERROR })
  back: string;

  @IsIn(categories, { message: INCORRECT_CATEGORY_ERROR })
  category: CardCategory;
}
