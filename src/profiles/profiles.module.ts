// src/profile/profile.module.ts
import { Module } from '@nestjs/common';
import {ProfileService} from "./profile.service";
import { PrismaService } from '../prisma/prisma.service';
import {ProfileController} from "./profiles.controller";
import { ImageService } from '../images/images.service';

@Module({
  
  providers: [ProfileService,PrismaService,ImageService],
  controllers: [ProfileController],
})
export class ProfileModule {}
