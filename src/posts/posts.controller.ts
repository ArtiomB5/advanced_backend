import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({ summary: "Post creation" })
  @ApiResponse({ status: 201, type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    description: 'List of cats',
    type: CreatePostDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("image"))
  async create(@Body() createPostDto: CreatePostDto, @Req() req, @UploadedFile() image): Promise<{ id: number; title: string; content: string; image: string; createdAt: Date; updatedAt: Date; userId: number; }> {
    const {user} = req;
    const dto = {...createPostDto, userId: user.id}
    return this.postsService.create(dto, image);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
