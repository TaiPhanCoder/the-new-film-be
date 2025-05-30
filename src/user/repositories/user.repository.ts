import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.ormRepository.create(createUserDto);
    return this.ormRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.ormRepository.find();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.ormRepository.findOneBy({ id });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updateResult = await this.ormRepository.update(id, updateUserDto);
    if (updateResult.affected === 0) {
      return null;
    }
    return this.findUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.ormRepository.findOneBy({ username });
  }
}
