import { Repository } from 'typeorm';
import { UserAbstractRepository } from '../user.abstract.repository';
import { Users } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TYPEORM_DATABASE } from '@/database/database-constants';

export class UserTypeormRepository implements UserAbstractRepository {
  constructor(
    @InjectRepository(Users, TYPEORM_DATABASE)
    private readonly user: Repository<Users>,
  ) {}
  find(): Promise<any[]> {
    return this.user.find();
  }
  create(userObj: any): Promise<any> {
    return this.user.save(userObj);
  }
  update(userObj: any): Promise<any> {
    return this.user.update(userObj.id, userObj);
  }
  delete(id: string): Promise<any> {
    return this.user.delete(id);
  }
}
