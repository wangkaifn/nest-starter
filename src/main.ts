import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigService).get('NEXT_PORT', 3000);
  console.log(`当前服务运行在${port}端口`);
  await app.listen(port);
}
bootstrap();
