export interface IHostConfig {
  host: string;
  port: number;
  corsEndpoints: string[];
}

export const hostConfig = (): IHostConfig => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  corsEndpoints: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : [],
});
