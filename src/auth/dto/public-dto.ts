import { Exclude } from 'class-transformer';
import { SignupDto } from './signup-dto';

export class PublicUserDto extends SignupDto {
  @Exclude()
  password: string;

  @Exclude()
  id: string;

  constructor(partial: Partial<PublicUserDto>) {
    super();
    Object.assign(this, partial);
  }
}
