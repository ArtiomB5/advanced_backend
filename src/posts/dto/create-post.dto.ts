import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ example: "Lorem Ipsum", description: "Post title" })
    @IsString({ message: "Must be a string" })
    @Length(5, 50, { message: "Must be longer than 4 symbols and shorter than 50 symbols!" })
    readonly title: string;

    @ApiProperty({ example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", description: "Post content" })
    @IsString({ message: "Must be a string" })
    @Length(5, 250, { message: "Must be longer than 4 symbols and shorter than 250 symbols!" })
    readonly content: string;

    @ApiProperty({
        type: 'file',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
        description: "Post image address"
      })
    readonly image: string;
}
