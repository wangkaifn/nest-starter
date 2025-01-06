import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/common/guards/admin.guard';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { Public } from '@/common/decorators/public.decorator';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  @Version('1')
  // @UseGuards(AuthGuard('jwt'))
  async getHello() {
    return await this.userRepository.find();
  }
  @Get('test')
  @Public()
  // 1. 多个Guard 执行顺序 是从下到上
  // 2. 如果前面的Guard 返回false 那么后面的就不会执行了
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(AuthGuard('jwt'), AdminGuard) // 从左到右执行
  async getTest() {
    return 'ok';
  }
}
