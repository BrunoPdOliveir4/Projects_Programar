import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const password = await bcrypt.hash(pass, 10);
    if (await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async decryptToken(token: string): Promise<token> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token' + error);
    }
  }

  async getUserByToken(token: string): Promise<User> {
    const decoded: token = await this.decryptToken(token);
    const user = await this.usersService.findOne(decoded.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}

export type token = {
  id: number;
  username: string;
};
