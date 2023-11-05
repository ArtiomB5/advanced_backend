import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({ example: "USER", description: "General user role" })
    @IsString({ message: "Must be a string" })
    readonly role: string;
}
