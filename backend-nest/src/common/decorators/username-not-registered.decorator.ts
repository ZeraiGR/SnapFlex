import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ async: true })
export class IsUsernameNotRegistered implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(username: string) {
    return this.userService.findByUsername(username).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function UsernameNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameNotRegistered,
    });
  };
}
