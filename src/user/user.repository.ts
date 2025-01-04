import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';

import { Request } from 'express';
import { UserMongooseRepository } from './repository/user.mongoose.repository';
import { UserTypeOrmRepository } from './repository/user.typeorm.repository';
import { UserPrismaRepository } from './repository/user.prisma.repository';
import { UserAbstractRepository } from './user.abstract.repository';
import { UserAdapter } from './user.interface';

export class UserRepository implements UserAbstractRepository {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly usersMongooseRepository: UserMongooseRepository,
    private readonly userTypeOrmRepository: UserTypeOrmRepository,
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

    if (tenantId === 'default') {
      return this.userTypeOrmRepository;
    } else if (tenantId === 'mongo') {
      return this.usersMongooseRepository;
    } else if (tenantId === 'prisma') {
      return this.userPrismaRepository;
    }
  }
}
