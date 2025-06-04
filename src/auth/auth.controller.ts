import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Request() req) {
    const { password, ...result } = req.user;
    return result;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token.',
  })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async logout(@Request() req): Promise<{ message: string }> {
    await this.authService.logout(req.user.id);
    return { message: 'Logged out successfully' };
  }
}
