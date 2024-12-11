import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'];

    const envConfig = {
      type: this.configService.get('DB_TYPE'),
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: this.configService.get('DB_SYNC'),
      autoLoadEntities: this.configService.get('DB_AUTOLOAD'),
      tenantId,
    } as TypeOrmModuleOptions & { tenantId: string };

    let config: TypeOrmModuleOptions = {
      port: 3306,
    };

    if (tenantId === 'mysql1') {
      config = {
        port: 3307,
      };
    } else if (tenantId === 'postgres') {
      config = {
        type: 'postgres',
        port: 5432,
        username: 'pguser',
        password: 'example',
        database: 'testdb',
      };
    }

    const finalConfig = { ...envConfig, ...config };
    return finalConfig as TypeOrmModuleOptions;
  }
}
