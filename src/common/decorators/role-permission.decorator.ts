import { SetMetadata } from '@nestjs/common';
import { Action } from '../enum/action.enum';
import { Reflector } from '@nestjs/core';

const accumulateMetadata = (key: string, permission: string): any => {
  return (
    target: any,
    propertyKey?: string,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const reflector = new Reflector();
    if (descriptor && descriptor.value) {
      const existingPermissions = reflector.get(key, descriptor.value) || [];
      const newPermissions = [...existingPermissions, permission];
      SetMetadata(key, newPermissions)(target, propertyKey, descriptor);
    } else {
      const existingPermissions = reflector.get(key, target) || [];
      const newPermissions = [...existingPermissions, permission];
      SetMetadata(key, newPermissions)(target);
    }
  };
};

export const PERMISSION_KEY = 'permission';
export const Permission = (permission: string) =>
  accumulateMetadata(PERMISSION_KEY, permission);

export const Create = () =>
  accumulateMetadata(PERMISSION_KEY, Action.Create.toLocaleUpperCase());
export const Read = () =>
  accumulateMetadata(PERMISSION_KEY, Action.Read.toLocaleUpperCase());
export const Update = () =>
  accumulateMetadata(PERMISSION_KEY, Action.Update.toLocaleUpperCase());
export const Delete = () =>
  accumulateMetadata(PERMISSION_KEY, Action.Delete.toLocaleUpperCase());
export const Manage = () =>
  accumulateMetadata(PERMISSION_KEY, Action.Manage.toLocaleUpperCase());
