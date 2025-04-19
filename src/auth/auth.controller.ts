import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CookieService } from '../common/cookie/cookie.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const jwt = await this.authService.register(createAuthDto);
    this.cookieService.setAuthCookie(res, jwt);
    res.send({ message: 'User registered successfully' });
  }
  // @Post('login')
  // login(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.login(createAuthDto);
  // }
}
