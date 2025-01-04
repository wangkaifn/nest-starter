import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { PRISMA_DATABASE } from '../database-constants';
import { UserPrismaRepository } from '@/user/repository/user.prisma.repository';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      name: PRISMA_DATABASE,
      useClass: PrismaService,
    }),
  ],
  providers: [UserPrismaRepository],
  exports: [UserPrismaRepository],
})
export class PrismaCommonModule {}
