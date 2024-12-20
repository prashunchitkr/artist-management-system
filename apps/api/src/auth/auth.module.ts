import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CONFIG_KEYS } from '@/core/config/app.config';
import { IAuthConfig } from '@/core/config/auth.config';
import { UtilsModule } from '@/core/utils/utils.module';
import { UserModule } from '@/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    UtilsModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
