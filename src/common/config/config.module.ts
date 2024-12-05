import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';

import * as Joi from 'joi';
// 从环境变量中加载 .env 文件 (根据环境变量 NODE_ENV 不同加载不同的 .env 文件)
// envFilePath 从右到左加载
const envFilePath = [`.env.${process.env.NODE_ENV}`, '.env'];

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  NEXT_PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().ip().required(),
});
@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: configSchema,
    }),
  ],
})
export class ConfigModule {}
