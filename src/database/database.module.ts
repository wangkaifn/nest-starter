import { Module } from '@nestjs/common';
import { TypeormCommonModule } from './typeorm/typeorm-common.module';
import { PrismaCommonModule } from './prisma/prisma-common.module';
import { MongooseCommonModule } from './mongoose/mongoose-common.module';
import { UserRepository } from '@/user/user.repository';

@Module({
  imports: [TypeormCommonModule, PrismaCommonModule, MongooseCommonModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
