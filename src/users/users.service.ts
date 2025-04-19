import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from '../common/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, password } = createUserDto;
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
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getCount();
    return count === 0;
  }
}
