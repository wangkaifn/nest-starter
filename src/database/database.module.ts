import { Module } from '@nestjs/common';
import { TypeormCommonModule } from './typeorm/typeorm-common.module';
import { PrismaCommonModule } from './prisma/prisma-common.module';
import { MongooseCommonModule } from './mongoose/mongoose-common.module';

@Module({
  imports: [TypeormCommonModule, PrismaCommonModule, MongooseCommonModule],
})
export class DatabaseModule {}
