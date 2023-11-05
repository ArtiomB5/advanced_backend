import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Length } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({ example: 11, description: "User Id" })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: "Must be a number" })
  readonly userId: number;

  @ApiProperty({ example: 3, description: "Role Id" })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: "Must be a number" })
  @Length(5, 10, { message: "Must be longer than 5 symbols and shorter than 10 symbols!" })
  readonly roleId: number;
}