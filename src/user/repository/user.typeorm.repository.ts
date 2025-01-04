import { Repository } from 'typeorm';
import { UserAbstractRepository } from '../user.abstract.repository';
import { Users } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserTypeOrmRepository implements UserAbstractRepository {
  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>,
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
