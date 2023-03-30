import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  EMAIL_NOT_STRING_ERROR,
  EMAIL_WRONG_ERROR,
  FIELD_IS_EMPTY_ERROR,
  LIMIT_20_EXCEEDED_ERROR,
  LIMIT_4_NOT_EXCEEDED_ERROR,
  PASSWORD_NOT_STRING_ERROR,
  PASSWORD_VALIDATE_REGEXP,
  TO_WEAK_PASSWORD_ERROR,
} from '../auth.constants';

export class SigninDto {
  @IsNotEmpty({ message: FIELD_IS_EMPTY_ERROR })
  @IsString({ message: EMAIL_NOT_STRING_ERROR })
  @IsEmail(undefined, { message: EMAIL_WRONG_ERROR })
  email: string;

  @IsNotEmpty({ message: FIELD_IS_EMPTY_ERROR })
  @IsString({ message: PASSWORD_NOT_STRING_ERROR })
  @MinLength(4, { message: LIMIT_4_NOT_EXCEEDED_ERROR })
  @MaxLength(20, { message: LIMIT_20_EXCEEDED_ERROR })
  @Matches(PASSWORD_VALIDATE_REGEXP, {
    message: TO_WEAK_PASSWORD_ERROR,
  })
  password: string;
}
