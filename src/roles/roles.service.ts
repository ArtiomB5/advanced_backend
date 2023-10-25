import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({data: createRoleDto});
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  createUserRole(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.userRoles.create({data: {
      user: {
        connect: {
          id: createUserRoleDto.userId
        }
      },
      role: {
        connect: {
          id: createUserRoleDto.roleId
        }
      }
    }})
  }

  findOne(role: string) {
    return this.prisma.role.findUnique({where: {value: role}});
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
