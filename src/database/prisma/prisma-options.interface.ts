import { Prisma } from '@prisma/client';

export interface PrimaModuleOptions {
  url?: string;
  options?: Prisma.PrismaClientOptions;
  name?: string;
}
