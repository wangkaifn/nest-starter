import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { PrimaModuleOptions } from './prisma-options.interface';
import { PrismaClient } from '@prisma/client';

@Module({})
@Global()
export class PrismaCoreModule implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    throw new Error('Method not implemented.');
  }
  static forRoot(options: PrimaModuleOptions) {
    console.log(options);

    const prismaClientProvider = {
      provide: PrismaClient,
      useFactory: () => {
        return new PrismaClient({
          datasourceUrl: options.url,
          ...options.options,
        });
      },
    };
    return {
      module: PrismaCoreModule,
      providers: [prismaClientProvider],
      exports: [prismaClientProvider],
    };
  }
}
