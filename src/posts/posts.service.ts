import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService, private filesService: FilesService) {}
  async create(createPostDto: CreatePostDto & {userId: number}, image: any) {
    const fileName = await this.filesService.create(image);
    return this.prisma.post.create({data: {...createPostDto, image: fileName}});
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
