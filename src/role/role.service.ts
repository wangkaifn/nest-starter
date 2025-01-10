import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaClient } from 'prisma/clients/postgresql';
import { PRISMA_DATABASE } from '@/database/database-constants';

@Injectable()
export class RoleService {
  constructor(@Inject(PRISMA_DATABASE) private prismaClient: PrismaClient) {}
  async create(createRoleDto: CreateRoleDto) {
    return await this.prismaClient.$transaction(
      async (prisma: PrismaClient) => {
        const { permissions, ...restData } = createRoleDto;
        return prisma.role.create({
          data: {
            ...restData,
            RolePermissions: {
              create: permissions.map((permission) => ({
                permission: {
                  connectOrCreate: {
                    where: {
                      name: permission.name,
                    },
                    create: {
                      ...permission,
                    },
                  },
                },
              })),
            },
          },
        });
      },
    );
  }

  findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    return this.prismaClient.role.findMany({
      skip,
      take: limit,
      where: {
        name: {
          contains: search,
        },
      },
      include: {
        RolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaClient.role.findUnique({
      where: { id },
      include: {
        RolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prismaClient.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prismaClient.role.delete({
      where: { id },
    });
  }
}
