export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expires_in: number;
}
