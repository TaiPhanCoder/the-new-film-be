import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserResponseDto | null> {
    const userCredentials = await this.userService.validateUserCredentials(
      email,
      pass,
    );
    if (!userCredentials) {
      return null;
    }
    // Transform Omit<User, 'password'> to UserResponseDto
    const { createdAt, updatedAt, ...userResponse } = userCredentials;
    return userResponse as UserResponseDto;
  }

  async login(user: UserResponseDto): Promise<LoginResponseDto> {
    const payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUserWithHashedPassword(createUserDto);
  }
}
