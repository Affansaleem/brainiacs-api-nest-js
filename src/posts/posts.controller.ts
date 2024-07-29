// src/post/post.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './posts.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dtos/createposts.dto';
import { multerOptions } from '../../multer.config';
import { ImageService } from '../images/images.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly imageService: ImageService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createPostDto.userId= (+createPostDto.userId);
    if (file) {
      const compressedFileName = file.filename.replace(/(jpg|jpeg|png)$/, 'compressed.$1');
      await this.imageService.compressImage(file.path);
      createPostDto.image = compressedFileName;
    }

    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAllPosts();
  }

  @Get('user/:userId') // Endpoint to find posts by user ID
  findPostsByUserId(@Param('userId') userId: number) {
    const User= (+userId);
    return this.postService.findPostsByUserId(User);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: { content?: string; image?: string }, // Adjust if needed
    @UploadedFile() file: Express.Multer.File,
  ) {
    const User= (+id);
    if (file) {
      const compressedFileName = file.filename.replace(/(jpg|jpeg|png)$/, 'compressed.$1');
      await this.imageService.compressImage(file.path);
      updatePostDto.image = compressedFileName; // This will work if image is defined
    }

    return this.postService.updatePostByUserId(User, updatePostDto);
  }

  @Delete('user/:userId') // Delete posts by user ID
  remove(@Param('userId') userId: number) {
    const User= (+userId);
    return this.postService.deletePostByUserId(User);
  }
}
