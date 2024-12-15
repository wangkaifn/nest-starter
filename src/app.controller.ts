import { Controller, Get, Inject, Version } from '@nestjs/common';
// import { PrismaService } from './database/prisma/prisma.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Users } from './user/user.entity';
// import { Repository } from 'typeorm';
import { PrismaClient } from '@prisma/client';
// import { UserRepository } from './user/user.repository';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user/user.schema';
// import { Model } from 'mongoose';

@Controller()
export class AppController {
  // private userRepository;
  constructor(
    @Inject('prisma1') private readonly prisma1: PrismaClient,
    @Inject('prisma2') private readonly prisma2: PrismaClient,
  ) {}

  // constructor(private readonly repository: UserRepository) {
  //   this.userRepository = repository.findAll();
  // }

  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  // constructor(
  //   @InjectRepository(Users) private readonly user: Repository<Users>,
  // ) {}

  @Get()
  @Version('1')
  async getHello() {
    return await this.prisma1.user.findMany();
  }

  @Get()
  @Version('2')
  async getHelloV2() {
    return await this.prisma2.user.findMany();
  }
}
