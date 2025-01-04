import { Controller, Get, Version } from '@nestjs/common';

import { UserRepository } from './user/user.repository';

@Controller()
export class AppController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  @Version('1')
  async getHello() {
    // return await this.prisma1.user.findMany();
    return await this.userRepository.find();
  }

  @Get()
  @Version('2')
  async getHelloV2() {
    // return await this.prisma2.user.findMany();
  }
}
