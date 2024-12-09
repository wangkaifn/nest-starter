import { Controller, Get, Version } from '@nestjs/common';
// import { PrismaService } from './database/prisma/prisma.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user/user.entity';
import { Repository } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user/user.schema';
// import { Model } from 'mongoose';

@Controller()
export class AppController {
  // constructor(private readonly prisma: PrismaService) {}

  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>,
    @InjectRepository(Users, 'mysql1')
    private readonly user1: Repository<Users>,
  ) {}

  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get()
  @Version('1')
  async getHello() {
    return await this.user.find();
  }

  @Get()
  @Version('2')
  async getHelloV2() {
    return await this.user1.find();
  }
}
