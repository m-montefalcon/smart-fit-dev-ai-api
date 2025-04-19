import { Module } from '@nestjs/common';
import { PasswordService } from './password/password.service';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
  ],
  providers: [PasswordService, JwtService],
  exports: [PasswordService, JwtService],
})
export class CommonModule {}
