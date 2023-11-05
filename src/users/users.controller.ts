import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanDto } from './dto/ban.dto';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "User creation"})
  @ApiResponse({status: 201, type: UserEntity})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({summary: "Get all users"})
  @ApiResponse({status: 200, type: Array<UserEntity>})
  @ApiBearerAuth()
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: "Add new role for user"})
  @ApiResponse({status: 202, type: Array<UserEntity>})
  @ApiBearerAuth()
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Patch(':userId/role')
  addRole(@Param('userId/role') userId: string, @Body() role: AddRoleDto) {
    return this.usersService.addRole(userId, role);
  }

  @ApiOperation({summary: "Ban user"})
  @ApiResponse({status: 202, type: Array<UserEntity>})
  @ApiBearerAuth()
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Patch(':userId/ban')
  banUser(@Param('userId') userId: string, @Body() banReason: BanDto) {
    return this.usersService.banUser(userId, banReason);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
