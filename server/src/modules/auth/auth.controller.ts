import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @HttpCode(201)
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registrUser(dto);
  }

  @ApiTags('Auth')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
