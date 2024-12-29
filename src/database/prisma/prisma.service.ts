import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  PrismaModuleOptions,
  PrismaOptionsFactory,
} from './prisma-options.interface';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService implements OnModuleInit, PrismaOptionsFactory {
  constructor(
    @Inject(REQUEST) private request: Request,
    private configService: ConfigService,
  ) {}
  createPrismaModuleOptions():
    | Promise<PrismaModuleOptions>
    | PrismaModuleOptions {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'] || 'default';
    if (tenantId === 'default1') {
      return {
        url: 'mysql://root:example@localhost:3306/testdb',
      };
    } else if (tenantId === 'default2') {
      return {
        url: 'postgresql://pguser:example@localhost:5432/testdb',
      };
    } else {
      return { url: this.configService.get('DATABASE_URL') };
    }
  }
  async onModuleInit() {}
}
