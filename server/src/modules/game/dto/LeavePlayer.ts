import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class LeavePlayerDTO{
    @ApiProperty()
    @IsNumber()
    userId: number;
}