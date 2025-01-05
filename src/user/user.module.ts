import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './repository/user.prisma.repository';
import { TYPEORM_DATABASE } from '@/database/database-constants';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormRepository } from './repository/user.typeorm.repository';
import { MongooseModule } from '@/database/mongoose/mongoose.module';
import { User, UserSchema } from './user.schema';
import { UserMongooseRepository } from './repository/user.mongoose.repository';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { getEnvs } from '@/utils/get-envs';
import { toBoolean } from '@/utils/format';

const parsedConfig = getEnvs();
const tenantMode = toBoolean(parsedConfig['TENANT_MODE']);
const tenantDBType = parsedConfig['TENANT_DB_TYPE']?.split(',') || [];
const imports = tenantMode
  ? tenantDBType
      ?.map((db) => {
        switch (db) {
          case 'typeorm':
            return TypeOrmModule.forFeature([Users], TYPEORM_DATABASE);
          case 'mongoose':
            return MongooseModule.forFeature([
              { name: User.name, schema: UserSchema },
            ]);
          default:
            return null;
        }
      })
      ?.filter(Boolean)
  : [];

const providers = tenantMode
  ? tenantDBType
      .map((db) => {
        switch (db) {
          case 'typeorm':
            return UserTypeormRepository;
          case 'mongoose':
            return UserMongooseRepository;
          case 'prisma':
            return UserPrismaRepository;
          default:
            return null;
        }
      })
      ?.filter(Boolean)
  : [UserPrismaRepository];

@Module({
  imports,
  providers: [...providers, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
