import { CONFIG_KEYS } from '@/core/config/app.config';
import { IAuthConfig } from '@/core/config/auth.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds: number;

  constructor(configService: ConfigService) {
    const { bcrypt } = configService.get<IAuthConfig>(CONFIG_KEYS.auth);
    this.saltRounds = bcrypt.saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
