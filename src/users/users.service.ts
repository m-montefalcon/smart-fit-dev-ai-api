import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { isEmail } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullName, email, password } = createUserDto;
    const takenEmail = isEmail(email);
    if (takenEmail) {
      throw new UnprocessableEntityException('Email already taken');
    }
    const user = this.userRepository.create({
      fullName,
      email,
      password,
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
    console.info('I REACHED HERE WITH PARAMS ', email);
    return this.userRepository.findOne({ where: { email } });
  }

  async isEmailUnique(email: string): Promise<boolean> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getCount()
      .then((count) => count === 0);
  }
}
