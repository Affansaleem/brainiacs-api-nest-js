// src/profile/profile.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {ProfileService} from "./profile.service";
import {ProfileController} from "./profiles.controller";

@Module({
  
  providers: [ProfileService,PrismaService],
  controllers: [ProfileController],
})
export class ProfileModule {}
