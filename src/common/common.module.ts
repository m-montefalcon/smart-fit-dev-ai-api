import { Module } from '@nestjs/common';
import { PasswordService } from './password/password.service';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from './cookie/cookie.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard.';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
  ],
  providers: [PasswordService, JwtService, CookieService, JwtAuthGuard],
  exports: [PasswordService, JwtService, CookieService],
})
export class CommonModule {}
