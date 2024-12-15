import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { PrimaModuleOptions } from './prisma-options.interface';
import { getDBType } from './prisma.utils';

import { PrismaClient as MysqlClient } from 'prisma-mysql';
import { PrismaClient as PgClient } from 'prisma-postgresql';
import { PRISMA_CONNECTION_NAME } from './prisma.constants';

@Module({})
@Global()
export class PrismaCoreModule implements OnApplicationShutdown {
  onApplicationShutdown() {
    throw new Error('Method not implemented.');
  }
  static forRoot(_options: PrimaModuleOptions) {
    const { options, name, url } = _options;
    let newOptions = {
      datasourceUrl: url,
    };
    if (options && Object.keys(options).length > 0) {
      newOptions = {
        ...newOptions,
        ...options,
      };
    }
    const providerName = name || PRISMA_CONNECTION_NAME;

    const prismaClientProvider = {
      provide: providerName,
      useFactory: () => {
        const dbType = getDBType(url);
        console.log(dbType, 'dbType');

        if (dbType === 'mysql') {
          return new MysqlClient(newOptions);
        } else if (dbType === 'postgresql') {
          return new PgClient(newOptions);
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
