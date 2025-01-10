import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PRISMA_DATABASE } from '@/database/database-constants';
import { PrismaClient } from 'prisma/clients/postgresql';

@Injectable()
export class PermissionService {
  constructor(@Inject(PRISMA_DATABASE) private prismaClient: PrismaClient) {}
  create(createPermissionDto: CreatePermissionDto) {
    return this.prismaClient.permission.create({
      data: createPermissionDto,
    });
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.prismaClient.permission.findMany({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.prismaClient.permission.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.prismaClient.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
  }

  remove(id: number) {
    return this.prismaClient.permission.delete({
      where: { id },
    });
  }
}
