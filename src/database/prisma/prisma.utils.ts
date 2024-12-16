import { Logger } from '@nestjs/common';
import { retry, timer, throwError, catchError } from 'rxjs';

export const PROTOCALREGEX = /^(.*?):\/\//;

export function getDBType(url: string) {
  const matches = url.match(PROTOCALREGEX);
  const protocol = matches ? matches[1] : 'file';

  return protocol === 'file' ? 'sqlite' : protocol;
}

export function handleRetry(retryAttempts: number, retryDelay: number) {
  const logger = new Logger('PrismaModule');
  return (source) =>
    source.pipe(
      retry({
        // 重试次数
        count: retryAttempts < 0 ? Infinity : retryAttempts,
        // 重试延迟逻辑
        delay: (error, retryCount) => {
          // 根据重试次数计算最大重试次数
          const attemps = retryAttempts < 0 ? Infinity : retryAttempts;
          // 判断当前重试次数是否小于等于最大重试次数
          if (retryCount <= attemps) {
            // 记录重试日志
            logger.error(
              `Unable to connect to the database. Retrying (${retryCount})...`,
              error.stack,
            );
            // 返回延迟时间
            return timer(retryDelay);
          } else {
            // 超过最大重试次数，抛出错误
            return throwError(() => new Error('Reached max retries'));
          }
        },
      }),
      // 错误处理逻辑
      catchError((error) => {
        // 记录连接数据库失败日志
        logger.error(
          `Failed to connect to the database after retries ${retryAttempts} times`,
          error.stack || error,
        );
        // 抛出错误
        return throwError(() => error);
      }),
    );
}
