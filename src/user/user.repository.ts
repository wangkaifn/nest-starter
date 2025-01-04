import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';

import { Request } from 'express';
import { UserMongooseRepository } from './repository/user.mongoose.repository';
import { UserTypeormRepository } from './repository/user.typeorm.repository';
import { UserPrismaRepository } from './repository/user.prisma.repository';
import { UserAbstractRepository } from './user.abstract.repository';
import { UserAdapter } from './user.interface';

export class UserRepository implements UserAbstractRepository {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly userMongooseRepository: UserMongooseRepository,
    private readonly userTypeormRepository: UserTypeormRepository,
    private readonly userPrismaRepository: UserPrismaRepository,
  ) {}
  find(): Promise<any[]> {
    const client = this.getRepository();
    return client.find();
  }
  create(userObj: any): Promise<any> {
    const client = this.getRepository();
    return client.create(userObj);
  }
  update(userObj: any): Promise<any> {
    const client = this.getRepository();
    return client.update(userObj);
  }
  delete(id: string): Promise<any> {
    const client = this.getRepository();
    return client.delete(id);
  }

  getRepository(): UserAdapter {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'] || 'default';

    if (tenantId === 'mongo' || tenantId === 'mongo1') {
      return this.userMongooseRepository;
    } else if (
      tenantId === 'typeorm1' ||
      tenantId === 'typeorm2' ||
      tenantId === 'typeorm3'
    ) {
      return this.userTypeormRepository;
    } else if (tenantId === 'prisma1' || tenantId === 'prisma2') {
      return this.userPrismaRepository;
    }
  }
}
