// src/profile/profile.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: { bio?: string; username: string; picture?: string; userId: number }) {
    return this.prisma.profile.create({ data });
  }

  async findAllProfiles() {
    return this.prisma.profile.findMany();
  }

  async findProfileById(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async updateProfile(id: number, data: { bio?: string; username?: string; picture?: string }) {
    return this.prisma.profile.update({ where: { id }, data });
  }

  async deleteProfile(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
