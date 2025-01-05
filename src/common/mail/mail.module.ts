import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const MAIL_HOST = configService.get('MAIL_HOST');
        const MAIL_PORT = configService.get('MAIL_PORT');
        const MAIL_USER = configService.get('MAIL_USER');
        const MAIL_PASS = configService.get('MAIL_PASS');
        return {
          // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
          transport: {
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: true,
            auth: {
              user: MAIL_USER,
              pass: MAIL_PASS,
            },
          },
          defaults: {
            from: '"阿凯" <modules@nestjs.com>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },

      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
