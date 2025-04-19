/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}
import { JwtService } from '../jwt/jwt.service'; // Adjust path

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const user = this.jwtService.validateToken(token);
      request.user = user; // Attach to request
      return true;
    } catch (err: any) {
      throw new UnauthorizedException('Invalid or expired token' + err);
    }
  }
}
