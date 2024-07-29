import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, data: { email?: string; password?: string }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async signIn(signInDto: { email: string; password: string }) {
    const { email, password } = signInDto;

   
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    if (password !== user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
