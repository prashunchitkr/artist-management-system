import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IJwtPayload } from '../strategies/jwt.strategy';
import { Role } from '@/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user: IJwtPayload['profile'];
    }>();

    const { role } = request.user; // populated by JwtStrategy

    return roles.includes(role);
  }
}
