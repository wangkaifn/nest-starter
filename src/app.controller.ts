import { Controller, Get, Version } from '@nestjs/common';
// import { PrismaService } from './database/prisma/prisma.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Users } from './user/user.entity';
// import { Repository } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user/user.schema';
// import { Model } from 'mongoose';

@Controller()
export class AppController {
  // constructor(private readonly prisma: PrismaService) {}

  // constructor(
  //   @InjectRepository(Users) private readonly user: Repository<Users>,
  // ) {}

  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  @Version('2')
  async getHelloV2() {
    // const users = await this.prisma.user.findMany();
    // const users = await this.user.find();
    // const users = await this.userModel.find();
    // return JSON.stringify(users);
  }
}
