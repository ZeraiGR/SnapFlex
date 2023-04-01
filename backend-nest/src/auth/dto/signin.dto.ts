import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

import {
  EMAIL_NOT_STRING_ERROR,
  EMAIL_WRONG_ERROR,
  FIELD_IS_EMPTY_ERROR,
  PASSWORD_NOT_STRING_ERROR,
} from '../auth.constants';

export class SigninDto {
  @IsNotEmpty({ message: FIELD_IS_EMPTY_ERROR })
  @IsString({ message: EMAIL_NOT_STRING_ERROR })
  @IsEmail(undefined, { message: EMAIL_WRONG_ERROR })
  email: string;

  @IsNotEmpty({ message: FIELD_IS_EMPTY_ERROR })
  @IsString({ message: PASSWORD_NOT_STRING_ERROR })
  password: string;
}
