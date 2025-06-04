import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { RedisService } from '../common/services/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule.register()],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    RedisService,
  ],
  exports: [UserService],
})
export class UserModule {}
