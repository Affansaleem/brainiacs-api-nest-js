import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: { email: string; password: string }) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: { email?: string; password?: string }) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  // Sign in endpoint
  @Post('signin')
  async signIn(@Body() signInDto: { email: string; password: string }) {
    return this.userService.signIn(signInDto);
  }
}
