import { Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PostEntity implements Post {

    @ApiProperty({ example: 1, description: "Unique identifier" })
    id: number;

    @ApiProperty({ example: 'Lorem Impus', description: "Post title" })
    title: string;

    @ApiProperty({ example: 'Lorem Ipsum', description: "Password" })
    content: string;

    @ApiProperty({ example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", description: "Post content" })
    banned: string;

    @ApiProperty({ example: "....", description: "User roles" })
    image: string

    @ApiProperty({ example: new Date(), description: "Creation date" })
    createdAt: Date;

    @ApiProperty({ example: new Date(), description: "Update date" })
    updatedAt: Date;

    @ApiProperty({ example: 2, description: "User id" })
    userId: number
}