import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(
    input: Pick<User, 'username' | 'name' | 'email' | 'passwordHash'>,
  ): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(input));
  }
}
