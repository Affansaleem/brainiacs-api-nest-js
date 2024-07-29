// src/profile/profile.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: CreateProfileDto) {
    return this.prisma.profile.create({ data });
  }

  async findAllProfiles() {
    return this.prisma.profile.findMany();
  }

  async findProfileByUserId(userId: number) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }

  async updateProfileByUserId(userId: number, data: UpdateProfileDto) {
    return this.prisma.profile.update({ where: { userId }, data });
  }

  async deleteProfileByUserId(userId: number) {
    return this.prisma.profile.delete({ where: { userId } });
  }
}
