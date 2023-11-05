import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }
  async login(userLoginData: CreateUserDto) {
    const user = await this.validateUser(userLoginData);
    return await this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const candidate = await this.usersService.getUserByEmail(email);
    if (candidate) {
      throw new HttpException('The email is alredy in use!', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.usersService.create({ email, password: hashPassword });
    return this.generateToken(user);
  };

  private async generateToken(user: UserEntity) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(user: CreateUserDto) {
    const { email, password } = user;
    const foundUser = await this.usersService.getUserByEmail(email);
    const isValidPassword = foundUser ? await bcrypt.compare(password, foundUser.password) : false;

    if (foundUser && isValidPassword) {
      return foundUser;
    }

    throw new UnauthorizedException({ message: "Wrong email or password" });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
