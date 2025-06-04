import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { hashPassword } from '../common/utils/hash.util';
import { RedisService } from '../common/services/redis.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly redisService: RedisService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.createUser(createUserDto);
    return this.transformToResponseDto(user);
  }

  async createUserWithHashedPassword(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const existingUserByEmail = await this.findUserByEmailForAuth(
      createUserDto.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    if (createUserDto.username) {
      const existingUserByUsername = await this.findUserByUsernameForAuth(
        createUserDto.username,
      );
      if (existingUserByUsername) {
        throw new ConflictException('Username already exists');
      }
    }

    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.transformToResponseDto(user);
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAllUsers();
    return users.map((user) => this.transformToResponseDto(user));
  }

  async findUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.transformToResponseDto(user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.transformToResponseDto(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async findUserByEmailForAuth(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findUserByUsernameForAuth(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.findUserByEmailForAuth(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: userPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
    expiresAt: Date | null,
  ): Promise<void> {
    if (refreshToken && expiresAt) {
      // Calculate TTL in seconds
      const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
      if (ttl > 0) {
        await this.redisService.setRefreshToken(userId, refreshToken, ttl);
        await this.redisService.setTokenToUserMapping(
          refreshToken,
          userId,
          ttl,
        );
      }
    } else {
      // Clear refresh token (logout)
      await this.redisService.clearAllRefreshTokensForUser(userId);
    }
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    const userId = await this.redisService.findUserByRefreshToken(refreshToken);
    if (!userId) {
      return null;
    }
    return this.userRepository.findUserById(userId);
  }

  private transformToResponseDto(user: User): UserResponseDto {
    const {
      password,
      createdAt,
      updatedAt,
      ...userResponse
    } = user;
    return userResponse as UserResponseDto;
  }
}
