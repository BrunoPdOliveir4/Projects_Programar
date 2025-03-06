import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { token } from 'src/infrastructure/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async decryptToken(token: string): Promise<token> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException(`Invalid token: ${error}`);
    }
  }

  async getUserByToken(token: string): Promise<User> {
    const decoded: token = await this.decryptToken(token);
    const user = await this.findByUsername(decoded.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getMyTasks(token: string): Promise<User> {
    const user: User = await this.getUserByToken(token);
    const userTasks: User | null = await this.userRepository.getUserTasks(
      user.id,
    );
    if (!userTasks) throw new NotFoundException('Tasks not found for user');
    return userTasks;
  }

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

  async getUserTasks(id: number): Promise<User> {
    const user = await this.userRepository.getUserTasks(id);
    if (!user) throw new NotFoundException('User not found');
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

  async create(user: RegisterDto): Promise<User> {
    this.emailValidation(user.email);
    if (await this.userRepository.findOneByEmail(user.email))
      throw new ConflictException('Email already in use');
    if (!user.password) throw new BadRequestException('Password is required');
    const newUser: User = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.created_at = new Date();
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.userRepository.create(newUser);
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
    if (!emailRegex.test(email)) throw new BadRequestException('Invalid email');
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
