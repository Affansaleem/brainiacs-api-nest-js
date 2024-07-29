import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dtos/profile.dto';
import { ImageService } from '../images/images.service';
import { ConfigService } from '@nestjs/config';
import { multerOptions } from '../../multer.config';


@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly imageService: ImageService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', multerOptions))
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      const compressedFileName = file.filename.replace(/(jpg|jpeg|png)$/, 'compressed.$1');
      await this.imageService.compressImage(file.path);
      createProfileDto.picture = compressedFileName;
    }
    
    if (typeof createProfileDto.userId === 'string') {
      createProfileDto.userId = parseInt(createProfileDto.userId, 10);
    }

    return this.profileService.createProfile(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAllProfiles();  
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const Id= +id;
    const profile = await this.profileService.findProfileByUserId(Id);
    
    if (profile && profile.picture) {
      const baseUrl = this.configService.get<string>('BASE_URL');
      profile.picture = `${baseUrl}/uploads/${profile.picture}`;
    }
    
    return profile;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    if (typeof updateProfileDto.userId === 'string') {
      updateProfileDto.userId = parseInt(updateProfileDto.userId, 10);
    }
    
    return this.profileService.updateProfileByUserId(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.profileService.deleteProfileByUserId(id);
  }
}
