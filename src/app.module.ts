import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { typeOrmConfig } from './config/typeorm.config';
import { redisConfig } from './config/redis.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RedisService } from './common/services/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.registerAsync(redisConfig),
    UserModule,
    AuthModule,
    MovieModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class AppModule {}
