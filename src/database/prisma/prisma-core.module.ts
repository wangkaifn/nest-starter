import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { PrimaModuleOptions } from './prisma-options.interface';
import { getDBType } from './prisma.utils';

import { PrismaClient as MysqlClient } from 'prisma-mysql';
import { PrismaClient as PgClient } from 'prisma-postgresql';

@Module({})
@Global()
export class PrismaCoreModule implements OnApplicationShutdown {
  onApplicationShutdown() {
    throw new Error('Method not implemented.');
  }
  static forRoot(options: PrimaModuleOptions) {
    console.log(options);

    const prismaClientProvider = {
      provide: 'PRISMA_CLIENT',
      useFactory: () => {
        const dbType = getDBType(options.url);
        console.log(dbType, 'dbType');

        const _options = {
          datasourceUrl: options.url,
          ...options.options,
        };
        if (dbType === 'mysql') {
          return new MysqlClient(_options);
        } else if (dbType === 'postgresql') {
          return new PgClient(_options);
        } else {
          throw new Error('Database type not supported');
        }
      },
    };
    return {
      module: PrismaCoreModule,
      providers: [prismaClientProvider],
      exports: [prismaClientProvider],
    };
  }
}
