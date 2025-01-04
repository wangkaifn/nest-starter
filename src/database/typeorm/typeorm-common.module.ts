import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { Users } from '@/user/user.entity';
import { TYPEORM_DATABASE } from '../database-constants';
import { TypeOrmProvider } from './typeorm.provider';
import { TYPEORM_CONNECTIONS } from './typeorm.constants';

const connections = new Map<string, DataSource>();
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: TYPEORM_DATABASE,
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (
        options: DataSourceOptions & { tenantId: string },
      ) => {
        const tenantId = options?.tenantId || 'default';
        if (tenantId && connections.has(tenantId)) {
          console.log(`已经连接到${tenantId}数据库`);
          return connections.get(tenantId);
        }
        const dataSource = await new DataSource(options).initialize();
        connections.set(tenantId, dataSource);
        console.log(`连接到${tenantId}数据库`);
        return dataSource;
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [
    TypeOrmProvider,
    {
      provide: TYPEORM_CONNECTIONS,
      useValue: connections,
    },
  ],
})
export class TypeormCommonModule {}
