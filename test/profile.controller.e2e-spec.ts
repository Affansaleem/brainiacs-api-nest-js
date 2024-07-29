import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
const { e2e } = require('pactum');
import * as request from 'supertest';
import { INestApplication, Body } from '@nestjs/common';
import { ProfileService } from '../src/profiles/profile.service';
import { ImageService } from '../src/images/images.service';
import { ProfileController } from '../src/profiles/profiles.controller';
import { CreateProfileDto, UpdateProfileDto } from '../src/profiles/dtos/profile.dto';

describe('ProfileController', () => {
  let app: INestApplication;
  let profileService: ProfileService;
  let imageService: ImageService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            createProfile: jest.fn(),
            findAllProfiles: jest.fn(),
            findProfileByUserId: jest.fn(),
            updateProfileByUserId: jest.fn(),
            deleteProfileByUserId: jest.fn(),
          },
        },
        {
          provide: ImageService,
          useValue: {
            compressImage: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    profileService = module.get<ProfileService>(ProfileService);
    imageService = module.get<ImageService>(ImageService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await app.close();
  });

const path = require('path'); 

const test_case = e2e('Profile API');

test_case.step('Post Profile', async () => {
  await e2e.spec()
    .post('/profiles')
    .withJson({
      userId: 1, 
      username: 'Affan',
      bio: 'Good work'
    })
    .attach('picture', path.resolve(__dirname, '../../uploads/2024-07-25T08-12-31-972Z.compressed.png'))
    .expectStatus(201)
    .expectJson({
      userId: 1,
      username: 'Affan',
      picture: 'profile.jpg',
      bio: 'Hello world'
    });
});

  describe('GET /profiles', () => {
    it('should return all profiles', async () => {
      const profiles = [{ userId: 1, picture: 'profile.jpg' }];
      jest.spyOn(profileService, 'findAllProfiles').mockResolvedValue(profiles as any);

      return request(app.getHttpServer())
        .get('/profiles')
        .expect(200)
        .expect(profiles);
    });
  });

  describe('GET /profiles/:id', () => {
    it('should return a profile by id', async () => {
      const profile = { userId: 1, picture: 'profile.jpg' };
      jest.spyOn(profileService, 'findProfileByUserId').mockResolvedValue(profile as any);
      jest.spyOn(configService, 'get').mockReturnValue('http://localhost:3000');

      return request(app.getHttpServer())
        .get('/profiles/1')
        .expect(200)
        .expect({
          ...profile,
          picture: 'http://localhost:3000/uploads/profile.jpg',
        });
    });
  });

  describe('PUT /profiles/:id', () => {
    it('should update a profile', async () => {
      const updateProfileDto: UpdateProfileDto = { userId: 1, picture: 'updated.jpg' };
      jest.spyOn(profileService, 'updateProfileByUserId').mockResolvedValue(updateProfileDto as any);

      return request(app.getHttpServer())
        .put('/profiles/1')
        .send(updateProfileDto)
        .expect(200)
        .expect(updateProfileDto);
    });
  });

  describe('DELETE /profiles/:id', () => {
    it('should delete a profile', async () => {
      jest.spyOn(profileService, 'deleteProfileByUserId').mockResolvedValue(undefined);

      return request(app.getHttpServer())
        .delete('/profiles/1')
        .expect(200);
    });
  });
});
