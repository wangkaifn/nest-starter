import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/Logger/Logger.module';
// import { PrismaModule } from './database/prisma/prisma.module';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
// import { Users } from './user/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    // PrismaModule,
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: configService.get('DB_TYPE'),
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //       // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //       synchronize: configService.get('DB_SYNC'),
    //       autoLoadEntities: true,
    //     } as TypeOrmModuleOptions;
    //   },
    // }),
    // TypeOrmModule.forFeature([Users]),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/user'),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
