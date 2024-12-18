import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

const PROVIDERS = [DatabaseService];
const EXPORTS = [DatabaseService];

@Module({
  providers: EXPORTS,
  exports: PROVIDERS,
})
export class InfraModule {
  static forRoot(): DynamicModule {
    return {
      module: InfraModule,
      global: true,
      providers: PROVIDERS,
      exports: EXPORTS,
    };
  }
}
