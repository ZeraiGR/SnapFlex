import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Min,
  Matches,
  Max,
  IsDate,
} from 'class-validator';

import { Match } from '../../common/decorators';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Max(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @IsNotEmpty()
  @IsString()
  // @Min(4)
  // @Max(20)
  @Match('password')
  passwordConfirm: string;

  @IsNotEmpty()
  @IsDate()
  dateOfBirch: Date;
}
