import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: { bio?: string; username: string; picture?: string; userId: number }) {
    return this.profileService.createProfile(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAllProfiles();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profileService.findProfileById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProfileDto: { bio?: string; username?: string; picture?: string }) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.profileService.deleteProfile(id);
  }
}
