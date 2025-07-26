import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserDTO {
    @ApiProperty()
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @IsString()
    username: string;
  
    @ApiProperty()
    @IsString()
    email: string;
  
    @ApiProperty()
    @IsString()
    password: string;
    
    @ApiProperty()
    @IsNumber()
    lobbyId: number;
  }
