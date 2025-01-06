import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  @Version('1')
  @UseGuards(AuthGuard('jwt'))
  async getHello() {
    return await this.userRepository.find();
  }
}
