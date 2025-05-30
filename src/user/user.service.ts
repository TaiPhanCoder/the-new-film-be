import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
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
}
