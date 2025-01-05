import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
@Controller()
// @UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async getHello(@Query('key') key: string) {
    const value = await this.cacheManager.get('key');
    console.log('value', value);
    await this.cacheManager.set('key', key || 'default key');
    return { key: value };
  }
}
