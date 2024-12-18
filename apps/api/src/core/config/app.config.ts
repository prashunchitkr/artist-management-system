import { databaseConfig, IDatabaseConfig } from './database.config';
import { hostConfig, IHostConfig } from './host.config';

export interface IAppConfig {
  host: IHostConfig;
  database: IDatabaseConfig;
}

export const appConfig = (): IAppConfig => ({
  host: hostConfig(),
  database: databaseConfig(),
});

export type ConfigKeys = {
  [key in keyof IAppConfig]: key;
};

export const CONFIG_KEYS: ConfigKeys = {
  host: 'host',
  database: 'database',
};
