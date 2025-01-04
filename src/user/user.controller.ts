import { Controller, Get, Version } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  @Version('1')
  async getHello() {
    return await this.userRepository.find();
  }
}
