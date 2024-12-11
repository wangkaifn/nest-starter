import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  const configService = app.get(ConfigService);
  const allFilterException = configService.get('ERROR_FILTER_ON');
  const cors = configService.get('CORS_ON');
  const versionStr = configService.get('VERSION');
  let version = [versionStr];
  const prefix = configService.get('API_PREFIX');
  if (cors === 'true') {
    app.enableCors();
  }

  if (allFilterException === 'true') {
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  }

  app.useLogger(logger);
  app.setGlobalPrefix(prefix);
  if (versionStr && versionStr.includes(',')) {
    version = versionStr.split(',');
  }
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: !versionStr ? VERSION_NEUTRAL : version,
  });

  // 启用 NestJS 应用的关闭钩子（shutdown hooks）
  // 在关闭时执行必要的清理工作，例如关闭数据库连接、释放资源等
  app.enableShutdownHooks();
  const port = configService.get('NEXT_PORT', 3000);
  logger.log(`当前服务运行在${port}端口`);
  await app.listen(port);
}
bootstrap();
