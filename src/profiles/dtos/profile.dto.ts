// src/profile/dtos/profile.dto.ts
export interface CreateProfileDto {
    bio?: string;
    username: string;
    picture?: string;
    userId: number; 
  }
  
  export interface UpdateProfileDto {
    bio?: string;
    username?: string;
    picture?: string;
    userId?: number;
  }
  