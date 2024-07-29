// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: { content: string; image?: string; userId: number }) {
    return this.prisma.post.create({ data });
  }

  async findAllPosts() {
    return this.prisma.post.findMany();
  }

  async findPostsByUserId(userId: number) {
    return this.prisma.post.findMany({ where: { userId } }); // Find posts by user ID
  }

  async updatePostByUserId(userId: number, data: { content?: string; image?: string }) {
    return this.prisma.post.updateMany({ where: { userId }, data }); // Update posts by user ID
  }

  async deletePostByUserId(userId: number) {
    return this.prisma.post.deleteMany({ where: { userId } }); // Delete posts by user ID
  }
}
