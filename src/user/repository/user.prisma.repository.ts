import { Inject } from '@nestjs/common';
import { UserAbstractRepository } from '../user.abstract.repository';
import { PRISMA_DATABASE } from '@/database/database-constants';
import { UserAdapter } from '../user.interface';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'prisma/clients/postgresql';

export class UserPrismaRepository implements UserAdapter {
  constructor(
    @Inject(PRISMA_DATABASE) private readonly prismaClient: PrismaClient,
    private configService: ConfigService,
  ) {}
  find(username: string): Promise<any[]> {
    return this.prismaClient.user.findMany({ where: { username } });
  }
  async create(userObj: any): Promise<any> {
    // 读取当前用户的角色id
    const defaultRoleId = +this.configService.get('DEFAULT_ROLE_ID');

    return await this.prismaClient.$transaction(async (prisma) => {
      const roleIds =
        userObj && userObj?.roleIds ? userObj.roleIds : [defaultRoleId];
      // 判断角色是否在数据库中
      const validateRoleIds = [];

      for (const roleId of roleIds) {
        const role = await prisma.role.findUnique({
          where: { id: roleId },
        });
        if (role) validateRoleIds.push(roleId);
      }

      if (validateRoleIds.length === 0) {
        validateRoleIds.push(defaultRoleId);
      }

      delete userObj.roleIds;

      return prisma.user.create({
        data: {
          ...userObj,
          UserRole: {
            create: validateRoleIds.map((roleId) => ({
              roleId,
            })),
          },
        },
      });
    });
  }
  update(userObj: any): Promise<any> {
    return this.prismaClient.user.update({
      where: { id: userObj.id },
      data: userObj,
    });
  }
  delete(id: string): Promise<any> {
    return this.prismaClient.user.delete({ where: { id } });
  }
}
