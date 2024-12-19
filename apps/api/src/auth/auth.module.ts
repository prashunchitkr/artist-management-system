import { Module } from '@nestjs/common';

import { UserModule } from '@/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthConfig } from '@/core/config/auth.config';
import { CONFIG_KEYS } from '@/core/config/app.config';
import { PasswordService } from './password.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<IAuthConfig>(CONFIG_KEYS.auth);
        return {
          global: true,
          signOptions: {
            issuer: authConfig.jwt.issuer,
            expiresIn: authConfig.jwt.expiration,
            algorithm: 'HS256',
          },
          verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false,
            issuer: authConfig.jwt.issuer,
          },
          secret: authConfig.jwt.secret,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  exports: [],
})
export class AuthModule {}
