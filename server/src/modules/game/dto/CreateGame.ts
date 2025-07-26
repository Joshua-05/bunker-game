import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateGameDTO{
    @ApiProperty()
    @IsString()
    id_game: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    count: number;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNumber()
    userId: number;
}