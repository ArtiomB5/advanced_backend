import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanDto } from './dto/ban.dto';

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
    const {UserRoles, password, ...rest} = user;
      return { ...rest, userRoles: user.UserRoles.map((role) => role.role.value) }
    })
    return usersWithRoles;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email }, include: {
        UserRoles: {
          include: {
            role: true,
          },
        }
      }
    });
    if (user) {
      const { UserRoles, ...rest } = user;
      return { ...rest, roles: UserRoles.map((userRole) => userRole.role.value) };
    } else {
      return null;
    }
  }

  async addRole(userId: string, newUserRole: AddRoleDto) {
    const user = await this.prisma.user.findUnique({where: {id: Number(userId)}});
    const role = await this.prisma.role.findUnique({where: {value: newUserRole.role}});
    const isUserHaveRole = user && role ? await this.prisma.userRoles.findFirst({where: {userId: user.id, roleId: role.id}}) : null;
    if (!isUserHaveRole) {
      return await this.prisma.userRoles.create({data: {userId: user.id, roleId: role.id}});
    }
    return user;
  }

  async banUser(userId: string, banReason: BanDto) {
    return await this.prisma.user.update({where: {id: Number(userId)}, data: {banned: true, banReason: banReason.reason}});
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
