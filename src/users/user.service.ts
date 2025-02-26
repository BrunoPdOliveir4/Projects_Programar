import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneByUserName(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByUserName(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(user: User): Promise<User> {
    this.emailValidation(user.email);
    if (await this.userRepository.findOneByEmail(user.email))
      throw new ConflictException('Email already in use');
    if (!user.password) throw new BadRequestException('Password is required');

    user.created_at = new Date();

    return this.userRepository.create(user);
  }

  async update(id: number, updatedUser: Partial<User>): Promise<User> {
    const userToUpdate = await this.findOne(id);

    const newUserData = {
      ...userToUpdate,
      ...updatedUser,
      updated_at: new Date(),
    };

    return newUserData;
  }

  private emailValidation(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) throw new BadRequestException('Invalid email');
  }
}

// try {
//   client = await this.repo.create(client);

//   await this.verificationService.createDefaultVerifications(client);

//   await this.languageService.create(client, clientDTO.language, 'Native');
// } catch (error) {
//   if (error instanceof QueryFailedError) {
//     throw new ConflictException('Email has been registered.');
//   }
// }
