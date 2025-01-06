import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '@/user/user.repository';
import { SignupDto } from './dto/signup-dto';
import { CreateUserPipe } from './pipes/create-user.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}
  @Post('signup')
  async signup(@Body(CreateUserPipe) dto: SignupDto) {
    return this.userRepository.create(dto);
  }

  @Post('signin')
  async signin(
    @Body()
    dto: SignupDto,
  ) {
    return this.authService.signin(dto.username, dto.password);
  }
}
