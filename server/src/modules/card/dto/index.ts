import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCardDTO{
    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    importance: number;

    @ApiProperty()
    @IsString()
    descripton: string;
}