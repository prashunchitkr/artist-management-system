export class AuthResponseDto {
  /**
   * The token to be used for bearer authentication
   */
  token: string;
  /***
   * The time in seconds until the token expires
   */
  expires_in: number;
}
