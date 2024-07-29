// src/image/image.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import sharp from 'sharp';

@Injectable()
export class ImageService {
  async compressImage(filePath: string): Promise<void> {
    const outputPath = filePath.replace(/(jpg|jpeg|png)$/, 'compressed.$1');

    await sharp(filePath)
      .resize({ width: 800 }) 
      .jpeg({ quality: 100 })
      .toFile(outputPath);

    await fs.unlink(filePath);
  }
}
