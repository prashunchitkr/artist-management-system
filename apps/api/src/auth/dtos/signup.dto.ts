import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsNullable } from '@/core/decorators/is-nullable.decorator';
import { Gender, ISignupRequest } from '@ams/core';

export class SignupDto implements ISignupRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLength: 8,
  })
  password: string;

  @IsNullable()
  @IsString()
  @MaxLength(20)
  phone: string | null;

  @IsNullable()
  @IsDate()
  dob: Date | null;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNullable()
  @IsString()
  @MaxLength(255)
  address: string | null;
}
