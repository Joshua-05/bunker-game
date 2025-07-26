import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registrUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    await this.userService.createUser(dto);
    const userData = {
      name: dto.firstName,
      email: dto.email
    }

    const user = await this.userService.publicUser(dto.email)
    const token = await this.tokenService.generateJwtToken(userData);
    return { ...user, token };
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIS);
    const validPassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validPassword) throw new BadRequestException(AppError.WRONG_DATA);
    const userData = {
      name: existUser.firstName,
      email: existUser.email
    }

    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email)
    return { ...user, token };
  }
}
