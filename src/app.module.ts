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
import { getEnvs } from './utils/get-envs';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

const conditionalImports = () => {
  const imports = [];
  const parsedConfig = getEnvs();
  if (toBoolean(parsedConfig['MAIL_ON'])) {
    imports.push(MailModule);
  }

  return imports;
};

@Module({
  imports: [
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
    AuthModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
