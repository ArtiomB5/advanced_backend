import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesModule } from 'src/files/files.module';
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h'
      }
    }),
    FilesModule,
  ]
})
export class PostsModule { }
