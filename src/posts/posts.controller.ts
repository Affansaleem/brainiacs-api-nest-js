// src/post/post.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: { content: string; image?: string; userId: number }) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findPostById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePostDto: { content?: string; image?: string }) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
