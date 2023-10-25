import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './entities/role.entity';

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: "Roles creation"})
  @ApiResponse({status: 201, type: RoleEntity})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({summary: "Get all roles"})
  @ApiResponse({status: 200, type: RoleEntity})
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({summary: "Get role data"})
  @ApiResponse({status: 200, type: RoleEntity})
  @Get(':role')
  findOne(@Param('role') role: string) {
    return this.rolesService.findOne(role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
