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
import * as dotenv from 'dotenv';
import { toBoolean } from './utils/format';

const conditionalImports = () => {
  const imports = [];

  const parsedConfig = {};
  const envFilePaths = ['.env', `.env.${process.env.NODE_ENV}`];
  envFilePaths.forEach((envFilePath) => {
    try {
      const config = dotenv.config({ path: envFilePath }).parsed;
      Object.assign(parsedConfig, config);
    } catch (error) {
      console.error(`Error loading ${envFilePath} file`);
    }
  });
  console.log('parsedConfig', parsedConfig);
  if (toBoolean(parsedConfig['MAIL_ON'])) {
    imports.push(MailModule);
  }

  return imports;
};

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
    ...conditionalImports(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
