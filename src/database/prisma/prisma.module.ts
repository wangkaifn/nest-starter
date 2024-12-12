import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrimaModuleOptions } from './prisma-options.interface';
import { PrismaCoreModule } from './prisma-core.module';

@Module({})
export class PrismaModule {
  static forRoot(url: string): DynamicModule;
  static forRoot(options: PrimaModuleOptions): DynamicModule;
  static forRoot(arg: any): DynamicModule {
    const _options = typeof arg === 'string' ? { url: arg } : arg;
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
