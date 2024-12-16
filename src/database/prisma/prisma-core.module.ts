import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { PrimaModuleOptions } from './prisma-options.interface';
import { getDBType, handleRetry } from './prisma.utils';

import { PrismaClient as MysqlClient } from 'prisma-mysql';
import { PrismaClient as PgClient } from 'prisma-postgresql';
import { PRISMA_CONNECTION_NAME } from './prisma.constants';
import { catchError, defer, lastValueFrom } from 'rxjs';

@Module({})
@Global()
export class PrismaCoreModule implements OnApplicationShutdown {
  onApplicationShutdown() {
    throw new Error('Method not implemented.');
  }
  static forRoot(_options: PrimaModuleOptions) {
    const {
      options,
      name,
      url,
      connectionErrorFactory,
      connectionFactory,
      retryAttempts = 10,
      retryDelay = 3000,
    } = _options;
    let newOptions = {
      datasourceUrl: url,
    };
    if (options && Object.keys(options).length > 0) {
      newOptions = {
        ...newOptions,
        ...options,
      };
    }

    const dbType = getDBType(url);
    let _prismaClient;

    if (dbType === 'mysql') {
      _prismaClient = MysqlClient;
    } else if (dbType === 'postgresql') {
      _prismaClient = PgClient;
    } else {
      throw new Error('Database type not supported');
    }

    const providerName = name || PRISMA_CONNECTION_NAME;

    const prismaConnectionErrorFactory =
      connectionErrorFactory || ((error) => error);
    const prismaConnectionFactory =
      connectionFactory || ((newOptions) => new _prismaClient(newOptions));

    const prismaClientProvider = {
      provide: providerName,
      useFactory: () => {
        // TODO: 添加重试机制
        const prismaClient = prismaConnectionFactory(newOptions, name);
        return lastValueFrom(
          defer(async () => await prismaClient.$connect()).pipe(
            handleRetry(retryAttempts, retryDelay),
            catchError((error) => {
              const prismaError = prismaConnectionErrorFactory(error);
              throw prismaError;
            }),
          ),
        ).then(() => prismaClient);
      },
    };
    return {
      module: PrismaCoreModule,
      providers: [prismaClientProvider],
      exports: [prismaClientProvider],
    };
  }
}
