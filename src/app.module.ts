import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/Logger/Logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
