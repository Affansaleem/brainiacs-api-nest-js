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

  async findPostById(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async updatePost(id: number, data: { content?: string; image?: string }) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
