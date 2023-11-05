import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from "./prisma/prisma.service";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [UsersModule, 
    PrismaModule, 
    RolesModule, 
    AuthModule, 
    PostsModule, 
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
  ]
})
export class AppModule {}
