import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('Users')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @ApiTags('Users')
  @Get('findUser/:email')
  findUser( @Param('email') email: string){
    return this.userService.findUserByEmail(email)
  }

  @ApiTags('Users')
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser ( @Req() request ): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.email)
  }
}
