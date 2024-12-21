import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig } from './core/config/app.config';
import { InfraModule } from './infra/infra.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    InfraModule.forRoot(),

    AuthModule,

    UserModule,
    ArtistModule,
  ],
})
export class AppModule {}
