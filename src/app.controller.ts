import { Controller, Get, Version } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  @Version('2')
  getHelloV2(): string {
    return 'Hello World!v2';
  }
}
