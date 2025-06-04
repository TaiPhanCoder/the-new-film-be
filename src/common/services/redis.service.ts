import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRefreshToken(
    userId: string,
    refreshToken: string,
    ttl: number = 7 * 24 * 60 * 60,
  ): Promise<void> {
    const key = `refresh_token:${userId}`;
    await this.cacheManager.set(key, refreshToken, ttl * 1000);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const key = `refresh_token:${userId}`;
    return await this.cacheManager.get<string>(key);
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    await this.cacheManager.del(key);
  }

  async findUserByRefreshToken(refreshToken: string): Promise<string | null> {
    const key = `token_to_user:${refreshToken}`;
    return await this.cacheManager.get<string>(key);
  }

  async setTokenToUserMapping(
    refreshToken: string,
    userId: string,
    ttl: number = 7 * 24 * 60 * 60,
  ): Promise<void> {
    const key = `token_to_user:${refreshToken}`;
    await this.cacheManager.set(key, userId, ttl * 1000);
  }

  async deleteTokenToUserMapping(refreshToken: string): Promise<void> {
    const key = `token_to_user:${refreshToken}`;
    await this.cacheManager.del(key);
  }

  async clearAllRefreshTokensForUser(userId: string): Promise<void> {
    const currentToken = await this.getRefreshToken(userId);
    if (currentToken) {
      await this.deleteTokenToUserMapping(currentToken);
    }
    await this.deleteRefreshToken(userId);
  }
}