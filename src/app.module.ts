import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/Logger/Logger.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: 'redis://localhost:6379',
    //   options: {
    //     password: 'example',
    //   },
    // }),
    // RedisModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'single',
    //     url: 'redis://localhost:6379',
    //     options: {
    //       password: 'example',
    //     },
    //   }),
    // }),
    CacheModule.register({
      ttl: 3 * 1000,
    }),
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
