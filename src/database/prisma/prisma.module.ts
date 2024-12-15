import { DynamicModule, Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
import { PrimaModuleOptions } from './prisma-options.interface';
import { PrismaCoreModule } from './prisma-core.module';

@Module({})
export class PrismaModule {
  static forRoot(url: string): DynamicModule;
  static forRoot(options: PrimaModuleOptions): DynamicModule;
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
      // providers: [PrismaService],
      // exports: [PrismaService],
      imports: [PrismaCoreModule.forRoot(_options)],
    };
  }

  static forFeature() {
    return {
      module: PrismaModule,
      providers: [],
      exports: [],
    };
  }
}
