import { InjectRedis } from '@nestjs-modules/ioredis';
import { Controller, Get, Query } from '@nestjs/common';
import Redis from 'ioredis';

@Controller()
export class AppController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get()
  async getHello(@Query('key') key: string) {
    await this.redis.set('key', key || 'default', 'EX', 60);
    const redisData = await this.redis.get('key');
    return { redisData };
  }
}
