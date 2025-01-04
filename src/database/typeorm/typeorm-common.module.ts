import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { TypeormProvider } from './typeorm.provider';
import { TYPEORM_CONNECTIONS } from './typeorm.constants';
import { Users } from '@/user/user.entity';
import { TYPEORM_DATABASE } from '../database-constants';
import { UserTypeormRepository } from '@/user/repository/user.typeorm.repository';

const connections = new Map<string, DataSource>();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: TYPEORM_DATABASE,
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        // tenantId
        const tenantId = options['tenantId'] || 'default';
        if (tenantId && connections.has(tenantId)) {
          return connections.get(tenantId);
        }
        const dataSource = await new DataSource(options).initialize();
        connections.set(tenantId, dataSource);
        return dataSource;
      },
      inject: [],
      extraProviders: [],
    }),
    TypeOrmModule.forFeature([Users], TYPEORM_DATABASE),
  ],
  providers: [
    TypeormProvider,
    {
      provide: TYPEORM_CONNECTIONS,
      useValue: connections,
    },
    UserTypeormRepository,
  ],
  exports: [UserTypeormRepository],
})
export class TypeormCommonModule {}
