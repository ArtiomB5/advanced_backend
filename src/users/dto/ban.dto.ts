import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class BanDto {
    @ApiProperty({ example: "Spam", description: "User ban reason description" })
    @IsString({ message: "Must be a string" })
    readonly reason: string;
}