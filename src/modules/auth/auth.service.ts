import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../users/dto/google.auth.dto';
import { User } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.findOne(email, password);
  }

  public async registerGoogleAuth(body: RegisterUserDto): Promise<User | never> {
    return await this.usersService.registerGoogleAuth(body);
  }

  public async checkIfUserAlreadyExistAndUpdate(id: string, body: RegisterUserDto): Promise<User | never> {
    return this.usersService.checkIfUserAlreadyExistAndUpadte(id, body);
  }
  async login(user: any) {
    try {
      const payload = { email: user.email, id: user.id, role: user.role };
      return {
        ...payload,
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    }
  }
}
