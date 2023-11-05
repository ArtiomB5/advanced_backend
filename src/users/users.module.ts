import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    JwtModule,
    PrismaModule, 
    RolesModule, 
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
