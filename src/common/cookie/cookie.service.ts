// src/common/cookie/cookie.service.ts
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  setAuthCookie(res: Response, token: string): void {
    const sixHoursInMs = 6 * 60 * 60 * 1000; // 6 hours

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: sixHoursInMs,
    });
  }

  clearAuthCookie(res: Response): void {
    res.clearCookie('jwt');
  }
}
