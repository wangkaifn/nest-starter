import { Module } from '@nestjs/common';
import { TypeormCommonModule } from './typeorm/typeorm-common.module';
import { PrismaCommonModule } from './prisma/prisma-common.module';
import { MongooseCommonModule } from './mongoose/mongoose-common.module';
import { getEnvs } from '@/utils/get-envs';
import { toBoolean } from '@/utils/format';

const parsedConfig = getEnvs();
const tenantMode = toBoolean(parsedConfig['TENANT_MODE']);
const tenantDBType = parsedConfig['TENANT_DB_TYPE']?.split(',');

const imports = tenantMode
  ? tenantDBType?.map((db) => {
      switch (db) {
        case 'prisma':
          return PrismaCommonModule;
        case 'typeorm':
          return TypeormCommonModule;
        case 'mongoose':
          return MongooseCommonModule;
        default:
          return TypeormCommonModule;
      }
    })
  : [PrismaCommonModule];

@Module({
  imports,
})
export class DatabaseModule {}
