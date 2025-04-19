import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interace';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  createToken(payload: JwtPayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'defaultSecret',
      expiresIn: process.env.JWT_EXPIRATION || '6h',
    });
  }

  validateToken<T extends object>(token: string): T {
    try {
      return this.jwtService.verify<T>(token, {
        secret: process.env.JWT_SECRET || 'defaultSecret',
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token' + error);
    }
  }
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
