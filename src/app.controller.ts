import { Controller, Get, Version } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  @Version('2')
  async getHelloV2(): Promise<string> {
    const users = await this.prisma.user.findMany();
    return JSON.stringify(users);
  }
}
