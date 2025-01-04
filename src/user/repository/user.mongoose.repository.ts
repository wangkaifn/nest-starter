import { InjectModel } from '@nestjs/mongoose';
import { UserAbstractRepository } from '../user.abstract.repository';
import { Model } from 'mongoose';
import { User } from '../user.schema';

export class UserMongooseRepository implements UserAbstractRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  find(): Promise<any[]> {
    return this.userModel.find();
  }
  create(userObj: any): Promise<any> {
    return this.userModel.create(userObj);
  }
  update(userObj: any): Promise<any> {
    return this.userModel.updateOne(userObj);
  }
  delete(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id });
  }
}
