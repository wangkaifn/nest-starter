import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return;
    const { roles } = value;
    if (roles && roles instanceof Array) {
      value.roles = roles.map((role) => parseInt(role));
    }
    console.log(value, 'value');

    return value;
  }
}
