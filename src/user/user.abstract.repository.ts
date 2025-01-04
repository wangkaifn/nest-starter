export abstract class UserAbstractRepository {
  abstract find(): Promise<any[]>;
  abstract create(userObj: any): Promise<any>;
  abstract update(userObj: any): Promise<any>;
  abstract delete(id: string): Promise<any>;
}
