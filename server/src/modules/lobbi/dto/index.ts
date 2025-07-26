import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLobbiDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  current: number;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsString()
  access: string;

  @ApiProperty()
  @IsString()
  password?: string;
}
