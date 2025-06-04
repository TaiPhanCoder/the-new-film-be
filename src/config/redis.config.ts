import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const redisConfig: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST') || 'localhost',
        port: parseInt(configService.get<string>('REDIS_PORT') || '6379', 10),
      },
      password: configService.get<string>('REDIS_PASSWORD'),
      database: parseInt(configService.get<string>('REDIS_DB') || '0', 10),
    });
    return {
      store: store as any,
      ttl: parseInt(configService.get<string>('REDIS_TTL') || '3600', 10),
    };
  },
  inject: [ConfigService],
};