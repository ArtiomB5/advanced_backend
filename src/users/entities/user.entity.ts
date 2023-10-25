import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {

  @ApiProperty({example: 1, description: "Unique identifier"})
  id: number;

  @ApiProperty({example: 'aaab@gmail.com', description: "Email"})
  email: string;

  @ApiProperty({example: 'qteuenfdg', description: "Password"})
  password: string;

  @ApiProperty({example: false, description: "Is user banned flag"})
  banned: boolean;

  @ApiProperty({example: 'Spam', description: "Ban reason description"})
  banReason: string;

  @ApiProperty({example: new Date(), description: "Creation date"})
  createdAt: Date;

  @ApiProperty({example: new Date(), description: "Update date"})
  updatedAt: Date;

  @ApiProperty({type: Array<string>, description: "User roles"})
  roles: Array<string>
}
