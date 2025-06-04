import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { v4 as uuidv4 } from 'uuid';

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

    // Generate refresh token
    const refreshToken = uuidv4();
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

    // Save refresh token to database
    await this.userService.updateRefreshToken(
      user.id,
      refreshToken,
      refreshTokenExpiresAt,
    );

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      refresh_token_expires_at: refreshTokenExpiresAt,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUserWithHashedPassword(createUserDto);
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseDto> {
    const { refresh_token } = refreshTokenDto;

    // Find user by refresh token
    const user = await this.userService.findUserByRefreshToken(refresh_token);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Redis TTL automatically handles token expiration
    // If we reach here, the token is still valid

    // Generate new access token
    const payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    // Generate new refresh token
    const newRefreshToken = uuidv4();
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7); // 7 days

    // Update refresh token in database
    await this.userService.updateRefreshToken(
      user.id,
      newRefreshToken,
      refreshTokenExpiresAt,
    );

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: newRefreshToken,
      refresh_token_expires_at: refreshTokenExpiresAt,
    };
  }

  async logout(userId: string): Promise<void> {
    // Clear refresh token from database
    await this.userService.updateRefreshToken(userId, null, null);
  }
}
