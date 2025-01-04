import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/Logger/Logger.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, LoggerModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
