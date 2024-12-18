export interface IHostConfig {
  host: string;
  port: number;
}

export const hostConfig = (): IHostConfig => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
});
