import { DynamicModule, Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
import {
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
} from './prisma-options.interface';
import { PrismaCoreModule } from './prisma-core.module';

@Module({})
export class PrismaModule {
  static forRoot(url: string): DynamicModule;
  static forRoot(options: PrismaModuleOptions): DynamicModule;
  static forRoot(url: string, name?: string): DynamicModule;
  static forRoot(arg: any, ...rest): DynamicModule {
    const _options =
      rest?.length > 0
        ? { url: arg, name: rest[0] }
        : typeof arg === 'string'
          ? { url: arg }
          : arg;
    return {
      module: PrismaModule,
      imports: [PrismaCoreModule.forRoot(_options)],
    };
  }

  static forRootAsync(options: PrismaModuleAsyncOptions) {
    return {
      module: PrismaModule,
      imports: [PrismaCoreModule.forRootAsync(options)],
    };
  }
}
