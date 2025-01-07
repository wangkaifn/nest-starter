import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ParseArrayPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '@/user/user.repository';
import { SignupDto } from './dto/signup-dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { PublicUserDto } from './dto/public-dto';
import { Serialize } from '@/common/decorators/serialize.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}
  @Post('signup')
  // @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(PublicUserDto)
  async signup(@Body(CreateUserPipe) dto: SignupDto): Promise<PublicUserDto> {
    const user = await this.authService.signup(dto.username, dto.password);
    return new PublicUserDto({ ...user });
  }

  @Post('signin')
  async signin(
    @Body()
    dto: SignupDto,
  ) {
    return this.authService.signin(dto.username, dto.password);
  }
}
