import { forwardRef, Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ async: true })
export class IsUserExists implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async validate(id: string) {
    if (!id?.match(/^[0-9a-fA-F]{24}$/))
      throw new BadRequestException('Передан некорректный ID пользователя');

    return this.userService.findById(id).then((user) => {
      if (!user) return false;
      return true;
    });
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExists,
    });
  };
}
