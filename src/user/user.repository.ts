import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';

import { Request } from 'express';

export class UserRepository {
  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>,
    @InjectRepository(Users, 'mysql1')
    private readonly user1: Repository<Users>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findAll(): Promise<Users[]> {
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'];
    if (tenantId === 'mysql1') {
      return await this.user1.find();
    }
    return await this.user.find();
  }
}
