import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, {
    // message中文
    message: (args) =>
      `用户名长度 ${args.constraints[0]} ～ ${args.constraints[1]}`,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30, {
    message: (args) =>
      `密码在长度在 ${args.constraints[0]} ～ ${args.constraints[1]}`,
  })
  password: string;

  @IsArray()
  @IsOptional()
  // @IsNumber(
  //   {},
  //   {
  //     each: true,
  //   },
  // )
  // @Transform(({ value }) => value.map((item) => Number(item)))
  roles: number[];
}
