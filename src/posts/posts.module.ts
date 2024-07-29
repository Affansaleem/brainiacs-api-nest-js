// src/post/post.module.ts
import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from '../images/images.service';

@Module({
  providers: [PostService,PrismaService,ImageService],
  controllers: [PostController],
})
export class PostModule {}
