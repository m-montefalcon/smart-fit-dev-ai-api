import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsMatchPassword } from '../../validators/is-match-password.validator';
interface CreateUserDtoInterface {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  // @IsEmailUnique()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsMatchPassword('password', {
    message: 'Password and Confirm Password do not match!',
  })
  confirmPassword: string;
}
