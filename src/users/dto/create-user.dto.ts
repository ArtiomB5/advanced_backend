// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: "user1@gmail.com", description: "User email"})
  @IsEmail({}, { message: "Incorrect email!" })
  readonly email: string;

  @ApiProperty({example: "1111U!", description: "User password. Min length - 5, max length - 10"})
  @IsString({ message: "Must be a string" })
  readonly password: string;
}