import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

export function getEnv(env: string) {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
}

export function buildConnectionOptions(): DataSourceOptions {
  const defaultConfig = getEnv('.env');
  const EnvConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);

  const config = { ...defaultConfig, ...EnvConfig };
  return {
    type: config['DB_TYPE'],
    host: config['DB_HOST'],
    port: config['DB_PORT'],
    username: config['DB_USERNAME'],
    password: config['DB_PASSWORD'],
    database: config['DB_DATABASE'],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: Boolean(config['DB_SYNC']),
    autoLoadEntities: Boolean(config['DB_AUTOLOAD']),
  } as DataSourceOptions;
}
export default new DataSource({
  ...buildConnectionOptions(),
} as DataSourceOptions);
