import { CONFIG_KEYS } from '@/core/config/app.config';
import { IAuthConfig } from '@/core/config/auth.config';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

export interface IJwtPayload {
  profile: Omit<User, 'password' | 'created_at' | 'updated_at'>;
  sub: string;
  iat: number;
  exp: number;
  iss: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const { jwt } = configService.get<IAuthConfig>(CONFIG_KEYS.auth);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  validate(payload: IJwtPayload): IJwtPayload['profile'] {
    return payload.profile;
  }
}
