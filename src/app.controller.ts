import { Controller, Get, Inject, Version } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './user/user.schema';

@Controller()
export class AppController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get()
  @Version('1')
  async getHello() {
    // return await this.prisma1.user.findMany();
    return await this.userModel.find();
  }

  @Get()
  @Version('2')
  async getHelloV2() {
    // return await this.prisma2.user.findMany();
  }
}
