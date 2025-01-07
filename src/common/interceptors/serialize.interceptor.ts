import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private dto: any,
    private flag?: boolean,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // 将数据转换为 DTO 实例
      // excludeExtraneousValues 参数表示是否排除额外的值
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          // Expose -> 暴露私有属性
          // Exclude -> 排除私有属性
          // 设置了true之后 所有经过拦截器的接口都需要配置Exclude 或者 Expose 装饰器
          excludeExtraneousValues: this.flag,
          // 开启隐式转换 比如将字符串转换为数字
          enableImplicitConversion: true,
        });
      }),
    );
  }
}
