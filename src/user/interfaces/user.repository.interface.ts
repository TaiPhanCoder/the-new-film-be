import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export const IUserRepository = Symbol('IUserRepository');
