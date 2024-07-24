import { Module } from '@nestjs/common';
import {UserModule} from "./users/users.module"
import { PrismaService } from './prisma/prisma.service';
import {ProfileModule} from "./profiles/profiles.module";
import {PostModule} from "./posts/posts.module"

@Module({
  imports: [UserModule,ProfileModule,PostModule],
  controllers: [],
  providers:[PrismaService]
 
})
export class AppModule {}
