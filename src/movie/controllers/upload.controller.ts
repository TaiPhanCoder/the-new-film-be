import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { UploadService } from '../services/upload.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { UploadResponseDto } from '../dto/upload-response.dto';

// Multer configuration for different file types
const createMulterOptions = (destination: string) => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(process.cwd(), 'uploads', destination);
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (destination === 'videos') {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Only video files are allowed'), false);
      }
    } else if (destination === 'posters' || destination === 'banners') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Only image files are allowed'), false);
      }
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: destination === 'videos' ? 500 * 1024 * 1024 : 10 * 1024 * 1024,
  },
});

@ApiTags('Upload')
@Controller('upload')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('video')
  @ApiOperation({ summary: 'Upload video file (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Video file to upload',
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
          description: 'Video file (max 500MB, video formats only)',
        },
      },
      required: ['video'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Video uploaded successfully',
    type: UploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @UseInterceptors(FileInterceptor('video', createMulterOptions('videos')))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No video file provided');
    }
    return this.uploadService.processUploadedFile(file, 'video');
  }

  @Post('poster')
  @ApiOperation({ summary: 'Upload poster image (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Poster image file to upload',
    schema: {
      type: 'object',
      properties: {
        poster: {
          type: 'string',
          format: 'binary',
          description: 'Poster image file (max 10MB, image formats only)',
        },
      },
      required: ['poster'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Poster uploaded successfully',
    type: UploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @UseInterceptors(FileInterceptor('poster', createMulterOptions('posters')))
  async uploadPoster(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No poster file provided');
    }
    return this.uploadService.processUploadedFile(file, 'poster');
  }

  @Post('banner')
  @ApiOperation({ summary: 'Upload banner image (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Banner image file to upload',
    schema: {
      type: 'object',
      properties: {
        banner: {
          type: 'string',
          format: 'binary',
          description: 'Banner image file (max 10MB, image formats only)',
        },
      },
      required: ['banner'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Banner uploaded successfully',
    type: UploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @UseInterceptors(FileInterceptor('banner', createMulterOptions('banners')))
  async uploadBanner(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No banner file provided');
    }
    return this.uploadService.processUploadedFile(file, 'banner');
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Upload multiple files (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Multiple files to upload',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Multiple files (max 10 files, 10MB each)',
        },
      },
      required: ['files'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Files uploaded successfully',
    type: [UploadResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @UseInterceptors(FilesInterceptor('files', 10, createMulterOptions('misc')))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UploadResponseDto[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    return Promise.all(
      files.map((file) => this.uploadService.processUploadedFile(file, 'misc')),
    );
  }
}
