import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from "./prisma/prisma.service";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [UsersModule, PrismaModule, RolesModule, AuthModule]
})
export class AppModule {}
