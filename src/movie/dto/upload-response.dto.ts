import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    description: 'Generated filename on server',
    example: 'video-1640995200000-123456789.mp4',
  })
  filename: string;

  @ApiProperty({
    description: 'Original filename from client',
    example: 'my-movie.mp4',
  })
  originalName: string;

  @ApiProperty({
    description: 'MIME type of the uploaded file',
    example: 'video/mp4',
  })
  mimetype: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 1048576,
  })
  size: number;

  @ApiProperty({
    description: 'Public URL to access the file',
    example:
      'http://localhost:3000/uploads/videos/video-1640995200000-123456789.mp4',
  })
  url: string;

  @ApiProperty({
    description: 'Server file path',
    example: '/uploads/videos/video-1640995200000-123456789.mp4',
  })
  path: string;

  @ApiProperty({
    description: 'File type category',
    example: 'video',
    enum: ['video', 'poster', 'banner', 'misc'],
  })
  type: string;

  @ApiProperty({
    description: 'Upload timestamp',
    example: '2023-12-20T10:30:00.000Z',
  })
  uploadedAt: Date;
}
