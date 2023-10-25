import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private role: RolesService) { }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const role = await this.role.findOne('USER');
    const user = await this.prisma.user.create({ data: createUserDto });
    await this.role.createUserRole({ userId: user.id, roleId: role.id });
    const userWithRoles: UserEntity = { ...user, roles: ['USER'] };
    return userWithRoles;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ include: { UserRoles: { include: { role: true } } } });
    const usersWithRoles = users.map((user) => {
      return { ...user, userRoles: user.UserRoles.map((role) => role.role.value) }
    })
    return usersWithRoles;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { email }, include: {
        UserRoles: {
          include: {
            role: true,
          },
        }
      }
    });
    const { UserRoles, ...rest } = user;
    const userWithRoles = { ...rest, roles: UserRoles.map((userRole) => userRole.role.value) };
    return userWithRoles;
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
}
