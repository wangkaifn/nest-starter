import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Controller()
// @UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getHello(@Query('key') key: string) {
    const value = await this.cacheManager.get('key');
    console.log('value', value);
    await this.cacheManager.set('key', key || 'default key');
    return { key: value };
  }

  @Get('mail')
  @Version('1')
  async seedMail() {
    const MAIL_USER = this.configService.get('MAIL_USER');
    this.mailerService
      .sendMail({
        to: 'kai150036@163.com',
        from: MAIL_USER,
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome',
        context: {
          firstName: '马超',
        },
      })
      .then(() => {
        console.log('邮件发送成功');
      })
      .catch((err) => {
        console.log('邮件发送失败', err);
      });
  }
}
