import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/common/guards/admin.guard';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { Public } from '@/common/decorators/public.decorator';
import { SerializeInterceptor } from '@/common/interceptors/serialize.interceptor';
import {
  Permission,
  Read,
  Update,
} from '@/common/decorators/role-permission.decorator';
import { RolePermissionGuard } from '@/common/guards/role-permission.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Serialize } from '@/common/decorators/serialize.decorator';
import { PublicUserDto } from '@/auth/dto/public-dto';

@Controller('user')
// @UseGuards(JwtGuard)
// @UseInterceptors(SerializeInterceptor)
@Update()
@Permission('user')
@UseGuards(RolePermissionGuard)
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  @Serialize(PublicUserDto)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  @Get()
  @Version('1')
  // @UseGuards(AuthGuard('jwt'))
  async getHello() {
    return await this.userRepository.find();
  }

  @Get('test')
  @Public()
  @Read()
  @Update()

  // 1. 多个Guard 执行顺序 是从下到上
  // 2. 如果前面的Guard 返回false 那么后面的就不会执行了
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(AuthGuard('jwt'), AdminGuard) // 从左到右执行
  async getTest() {
    return 'ok';
  }
}
