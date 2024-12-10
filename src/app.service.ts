import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class AppService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  getDBConfig(): TypeOrmModuleOptions {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'];
    if (tenantId === 'mysql1') {
      return {
        port: 3307,
      };
    } else if (tenantId === 'postgres') {
      return {
        type: 'postgres',
        port: 5432,
        username: 'pguser',
        password: 'example',
        database: 'testdb',
      };
    }
    return {
      port: 3306,
    };
  }
}
