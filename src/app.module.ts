import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { ProfileModule } from './profiles/profiles.module';
import { PostModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProfileModule,
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: join('/Users/smt/Desktop', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
