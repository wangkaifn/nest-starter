import { Inject } from '@nestjs/common';
import { UserAbstractRepository } from '../user.abstract.repository';
import { PrismaClient } from '@prisma/client';
import { PRISMA_DATABASE } from '@/database/database-constants';

export class UserPrismaRepository implements UserAbstractRepository {
  constructor(
    @Inject(PRISMA_DATABASE) private readonly prismaClient: PrismaClient,
  ) {}
  find(): Promise<any[]> {
    return this.prismaClient.user.findMany();
  }
  create(userObj: any): Promise<any> {
    return this.prismaClient.user.create({ data: userObj });
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
