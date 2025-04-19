import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '../common/jwt/jwt.service';
import { PasswordService } from '../common/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { fullName, email, password } = createAuthDto;
    const uniqueEmail = await this.isEmailUnique(email);
    if (!uniqueEmail) {
      throw new UnprocessableEntityException('Email already taken');
    }
    const hashPassword = await this.passwordService.hashPassword(password);
    const user = this.userRepository.create({
      fullName,
      email,
      password: hashPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const jwtTokenPayload = {
      id: savedUser.id,
      email: savedUser.email,
    };
    return this.jwtService.createToken(jwtTokenPayload);
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getCount();
    return count === 0;
  }
}
