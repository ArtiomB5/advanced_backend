import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity implements Role {

  @ApiProperty({example: 1, description: "Unique identifier"})
  id: number;

  @ApiProperty({example: 'aaab@gmail.com', description: "Role value"})
  value: string;

  @ApiProperty({example: 'ADMIN', description: "Administrator role"})
  description: string;

  @ApiProperty({example: new Date(), description: "Creation date"})
  createdAt: Date;

  @ApiProperty({example: new Date(), description: "Update date"})
  updatedAt: Date;

  @ApiProperty({example: 1, description: "User id"})
  userId: number;
}