export interface IAuthConfig {
  jwt: {
    secret: string;
    expiration: string;
    issuer: string;
  };
  bcrypt: {
    saltRounds: number;
  };
}

export const authConfig = (): IAuthConfig => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiration: process.env.JWT_EXPIRES_IN || '1d',
    issuer: process.env.JWT_ISSUER || 'localhost',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
  },
});
