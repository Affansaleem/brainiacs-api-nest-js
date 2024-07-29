// src/post/dto/create-post.dto.ts
export class CreatePostDto {
    content: string;
    userId: number;
    image?: string; // Make image optional
  }
  