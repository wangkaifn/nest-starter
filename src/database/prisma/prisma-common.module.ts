import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { PRISMA_DATABASE } from '../database-constants';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      name: PRISMA_DATABASE,
      useClass: PrismaService,
    }),
  ],
})
export class PrismaCommonModule {}
