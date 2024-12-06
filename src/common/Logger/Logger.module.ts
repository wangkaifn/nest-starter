import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import {
  ConsoleTransports,
  createRotateTransport,
} from './createRotateTransport';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logOn = configService.get('LOG_ON') === 'true';
        return {
          transports: [
            ConsoleTransports,
            ...(logOn
              ? [
                  createRotateTransport('info', 'application'),
                  createRotateTransport('warn', 'error'),
                ]
              : []),
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class LoggerModule {}
