import { Controller, Get, Version } from '@nestjs/common';
// import { PrismaService } from './database/prisma/prisma.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  // constructor(private readonly prisma: PrismaService) {}

  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  @Version('2')
  async getHelloV2(): Promise<string> {
    // const users = await this.prisma.user.findMany();
    const users = await this.user.find();
    return JSON.stringify(users);
  }
}
