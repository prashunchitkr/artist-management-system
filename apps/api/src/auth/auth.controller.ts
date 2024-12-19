import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignupDto): Promise<AuthResponseDto> {
    return this.authService.signup(data);
  }

  // TODO: Implement rate limiting
  @Post('login')
  async login(@Body() data: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(data.email, data.password);
  }
}
