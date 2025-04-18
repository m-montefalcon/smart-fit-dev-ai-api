import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ unique: true, name: 'full_name' })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
