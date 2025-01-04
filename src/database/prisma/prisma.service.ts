import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  PrismaModuleOptions,
  PrismaOptionsFactory,
} from './prisma-options.interface';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PrismaService implements OnModuleInit, PrismaOptionsFactory {
  constructor(@Inject(REQUEST) private request: Request) {}
  createPrismaModuleOptions():
    | Promise<PrismaModuleOptions>
    | PrismaModuleOptions {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'] || 'default';
    if (tenantId === 'prisma1') {
      return {
        url: 'mysql://root:example@localhost:3307/testdb',
      } as PrismaModuleOptions;
    } else if (tenantId === 'prisma2') {
      return { url: 'postgresql://pguser:example@localhost:5432/testdb' };
    }
  }
  async onModuleInit() {}
}
