import { ModuleMetadata, Type } from '@nestjs/common';
import { Prisma } from '@prisma/client';

/**
 * PrismaModuleOptions 接口定义了Prima模块的配置选项。
 */
export interface PrismaModuleOptions {
  /**
   * 数据库连接的URL。
   */
  url?: string;

  /**
   * Prisma客户端的选项配置。
   */
  options?: Prisma.PrismaClientOptions;

  /**
   * 模块的名称。
   */
  name?: string;

  /**
   * 在连接失败时重试的次数。
   */
  retryAttempts?: number;

  /**
   * 每次重试之间的延迟时间（毫秒）。
   */
  retryDelay?: number;

  /**
   * 一个函数，用于创建数据库连接。
   *
   * @param connection 数据库连接对象。
   * @param name 模块名称（可选）。
   * @returns 返回处理后的连接对象。
   */
  connectionFactory?: (connection: any, name?: string) => any;

  /**
   * 一个函数，用于处理连接错误。
   *
   * @param error Prisma客户端已知的请求错误。
   * @returns 返回处理后的错误对象。
   */
  connectionErrorFactory?: (
    error: Prisma.PrismaClientKnownRequestError,
  ) => Prisma.PrismaClientKnownRequestError;
}

export interface PrismaOptionsFactory {
  createPrismaModuleOptions():
    | Promise<PrismaModuleOptions>
    | PrismaModuleOptions;
}
export type PrismaModuleOptionsFactory = Omit<PrismaModuleOptions, 'name'>;
export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<PrismaOptionsFactory>;
  useClass?: Type<PrismaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PrismaModuleOptionsFactory> | PrismaModuleOptionsFactory;
  inject?: any[];
}
