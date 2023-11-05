import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({example: "USER", description: "USER role"})
  @IsString({message: "Must be a string"})
  readonly value: string;

  @ApiProperty({example: "General user", description: "General user"})
  @IsString({message: "Must be a string"})
  @Length(5, 50, { message: "Must be longer than 4 symbols and shorter than 50 symbols!" })
  readonly description: string;
}