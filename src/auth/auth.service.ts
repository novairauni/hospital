import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  login(dto: LoginDto) {
    const email = process.env.ADMIN_EMAIL || 'admin@hospital.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin123!';
    if (dto.email !== email || dto.password !== password) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const payload = { email, role: 'admin' };
    return { access_token: this.jwt.sign(payload), user: payload };
  }
}
