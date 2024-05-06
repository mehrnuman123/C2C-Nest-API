import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';
import { RegisterUserDto } from './dto/google.auth.dto';
import { CreateAdminDto } from './dto/create.admin.dto';
import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  public async registerUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto
    const user = new User();
    const hashPassword = await bcrypt.hash(password, 10);
    user.name = name
    user.email = email;
    user.auth_provider = 'Local',
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = hashPassword;
    user.role = Role.USER;
    return this.userRepository.save(user);
  }

  public async registerAdmin(createAdmin: CreateAdminDto) {
    const { name, email, password, company } = createAdmin
    const user = new User();
    user.name = name
    user.email = email;
    user.company = company
    user.createdAt = new Date();
    user.updatedAt = new Date();
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.role = Role.ADMIN;
    return this.userRepository.save(user);
  }

  public async registerGoogleAuth(body: RegisterUserDto): Promise<User | never> {
    const { name, email, role, phoneNumber, profile, auth_provider, uid, isVerified }: RegisterUserDto = body;
    const user = new User();
    user.name = name;
    user.auth_provider = auth_provider;
    user.email = email;
    user.role = role;
    user.uId = uid;
    user.profile = profile;
    user.phoneNumber = phoneNumber;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.isVerified = isVerified;
    return this.userRepository.save(user);
  }

  public async checkIfUserAlreadyExistAndUpadte(id: string, body): Promise<User | never> {
    const { profile, name, email, role} = body;  
    const user = await this.userRepository.findOne({ where: { uId: id } });
    if(user){
      user.name = name;
      user.email = email;
      user.profile = profile;
      user.role = role;
      return this.userRepository.save(user);
    }
  }


  public async findByEmail(email: string): Promise<User | never> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  public async findById(id: number): Promise<User | never> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(email: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);

      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }
}
