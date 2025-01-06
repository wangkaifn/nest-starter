import { UserRepository } from '@/user/user.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
  ) {}
  async signin(username: string, password: string) {
    const user = await this.userRepository.find(username);
    if (!user) {
      throw new ForbiddenException('用户不存在');
    }

    const isPasswordValid = user.length && user[0].password === password;

    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误');
    }

    return this.jwt.signAsync({
      id: user[0].id,
      username: user[0].username,
    });
  }

  signup(username: string, password: string) {
    return this.userRepository.create({
      username,
      password,
    });
  }
}
