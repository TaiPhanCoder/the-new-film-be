import { Injectable, Logger } from '@nestjs/common';
import { UploadResponseDto } from '../dto/upload-response.dto';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  async processUploadedFile(
    file: Express.Multer.File,
    type: string,
  ): Promise<UploadResponseDto> {
    try {
      this.logger.log(
        `Processing uploaded file: ${file.filename} of type: ${type}`,
      );

      // Generate file URL (adjust based on your server configuration)
      const fileUrl = this.generateFileUrl(file.filename, type);

      // Get file stats
      const stats = await fs.stat(file.path);

      const response: UploadResponseDto = {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl,
        path: file.path,
        type: type,
        uploadedAt: new Date(),
      };

      this.logger.log(`File uploaded successfully: ${file.filename}`);
      return response;
    } catch (error) {
      this.logger.error(`Error processing uploaded file: ${error.message}`);
      throw error;
    }
  }

  private generateFileUrl(filename: string, type: string): string {
    // This should match your static file serving configuration
    // For example, if you serve static files from /uploads route
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return `${baseUrl}/uploads/${this.getSubdirectory(type)}/${filename}`;
  }

  private getSubdirectory(type: string): string {
    switch (type) {
      case 'video':
        return 'videos';
      case 'poster':
        return 'posters';
      case 'banner':
        return 'banners';
      default:
        return 'misc';
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
      this.logger.log(`File deleted successfully: ${filePath}`);
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`);
      throw error;
    }
  }

  async getFileInfo(filePath: string): Promise<any> {
    try {
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
      };
    } catch (error) {
      this.logger.error(`Error getting file info: ${error.message}`);
      throw error;
    }
  }

  validateFileType(file: Express.Multer.File, allowedTypes: string[]): boolean {
    return allowedTypes.some((type) => file.mimetype.startsWith(type));
  }

  validateFileSize(file: Express.Multer.File, maxSize: number): boolean {
    return file.size <= maxSize;
  }
}
