import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/Logger/Logger.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/user.entity';
import { TypeOrmConfigService } from './database/typeorm/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { PrismaService } from './database/prisma/prisma.service';

const connections = new Map();
@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PrismaModule.forRootAsync({
      name: 'prisma1',
      useClass: PrismaService,
    }),
    // PrismaModule.forRoot(
    //   'postgresql://pguser:example@localhost:5432/testdb',
    //   'prisma1',
    // ),
    // PrismaModule.forRoot(
    //   'mysql://root:example@localhost:3306/testdb',
    //   'prisma2',
    // ),
    // PrismaModule,
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    //   dataSourceFactory: async (
    //     options: DataSourceOptions & { tenantId: string },
    //   ) => {
    //     const tenantId = options?.tenantId || 'default';
    //     if (tenantId && connections.has(tenantId)) {
    //       console.log(`已经连接到${tenantId}数据库`);

    //       return connections.get(tenantId);
    //     }
    //     const dataSource = await new DataSource(options).initialize();
    //     connections.set(tenantId, dataSource);
    //     console.log(`连接到${tenantId}数据库`);

    //     return dataSource;
    //   },
    // }),
    // TypeOrmModule.forFeature([Users]),
    // TypeOrmModule.forFeature([Users], 'mysql1'),
    // MongooseModule.forRoot('mongodb://root:example@localhost:27017/user'),

    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [
    // AppService,
    // {
    //   provide: 'TYPEORM_CONNECTIONS',
    //   useValue: connections,
    // },
  ],
})
export class AppModule {}
