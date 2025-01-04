export interface UserAdapter {
  find(): Promise<any[]>;
  create(userObj: any): Promise<any>;
  update(userObj: any): Promise<any>;
  delete(id: string): Promise<any>;
}
