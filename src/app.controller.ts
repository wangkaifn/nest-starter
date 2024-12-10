import { Controller, Get, Version } from '@nestjs/common';
// import { PrismaService } from './database/prisma/prisma.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user/user.repository';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user/user.schema';
// import { Model } from 'mongoose';

@Controller()
export class AppController {
  private userRepository;
  // constructor(private readonly prisma: PrismaService) {}

  constructor(private readonly repository: UserRepository) {
    this.userRepository = repository.findAll();
  }

  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get()
  @Version('1')
  async getHello() {
    return await this.repository.findAll();
  }

  @Get()
  @Version('2')
  async getHelloV2() {
    return await this.repository.findAll();
  }
}
