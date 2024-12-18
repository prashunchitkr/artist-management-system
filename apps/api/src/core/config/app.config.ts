import { hostConfig, IHostConfig } from './host.config';

export interface IAppConfig {
  host: IHostConfig;
}

export const appConfig = (): IAppConfig => ({
  host: hostConfig(),
});

export type ConfigKeys = {
  [key in keyof IAppConfig]: key;
};

export const CONFIG_KEYS: ConfigKeys = {
  host: 'host',
};
