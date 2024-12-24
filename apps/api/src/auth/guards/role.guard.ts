import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IJwtPayload } from '../strategies/jwt.strategy';
import { Role } from '@ams/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest<{
      user: IJwtPayload['profile'];
    }>();

    const { role } = request.user; // populated by JwtStrategy

    if (!roles && role === Role.SuperAdmin) {
      return true;
    }

    return roles.includes(role) || role === Role.SuperAdmin; // SuperAdmin can do anything
  }
}
