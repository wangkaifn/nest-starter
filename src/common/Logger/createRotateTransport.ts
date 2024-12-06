import { utilities } from 'nest-winston';
import { format } from 'winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Console } from 'winston/lib/winston/transports';

export const ConsoleTransports = new Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.ms(),
    utilities.format.nestLike('Winston', {
      colors: true, // 是否显示颜色
      prettyPrint: true, // 是否格式化输出
      processId: true, // 是否显示进程ID
      appName: true, // 是否显示应用名称
    }),
  ),
});

/**
 * 创建一个带有日志轮转功能的传输对象
 * 该函数用于初始化一个每日定时轮转的日志文件传输对象，便于日志管理
 * @param level 日志级别，决定了哪些级别的日志会被记录
 * @param fileName 日志文件的基础名称，实际文件名会加上日期后缀
 * @returns 返回一个配置好的DailyRotateFile实例，用于日志记录
 */
export function createRotateTransport(level: string, fileName: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.simple(),
      format.ms(),
    ),
  });
}
