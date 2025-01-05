import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/Logger/Logger.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { MailModule } from './common/mail/mail.module';

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
      ttl: 30 * 1000,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      password: 'example',
    }),
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
