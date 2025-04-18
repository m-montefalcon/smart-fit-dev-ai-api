import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {
    console.log('IsEmailUniqueValidator instantiated');
  }

  async validate(email: string): Promise<boolean> {
    console.log('Validating email uniqueness:', email);
    console.log('UsersService during validation:', this.userService);

    const user = await this.userService.findByEmail(email);
    return !user; // If no user is found, the email is unique
  }

  defaultMessage(): string {
    return 'Email $value already exists. Please choose another one.';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueValidator,
    });
  };
}
