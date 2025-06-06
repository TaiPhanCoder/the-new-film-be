import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  IsNumber,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: 'The title of the movie',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    description: 'The description of the movie',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'The poster image URL of the movie',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  posterUrl?: string;

  @ApiProperty({
    example: 'https://example.com/banner.jpg',
    description: 'The banner image URL of the movie',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  bannerUrl?: string;

  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'The video URL of the movie',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    example: '1994-09-23',
    description: 'The release date of the movie (YYYY-MM-DD)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  releaseDate?: string;

  @ApiProperty({
    example: 142,
    description: 'The duration of the movie in minutes',
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  duration?: number;

  @ApiProperty({
    example: 'Drama',
    description: 'The genre of the movie',
    required: false,
  })
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiProperty({
    example: 9.3,
    description: 'The rating of the movie (0-10)',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 'Frank Darabont',
    description: 'The director of the movie',
    required: false,
  })
  @IsString()
  @IsOptional()
  director?: string;

  @ApiProperty({
    example: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    description: 'The main cast of the movie',
    required: false,
  })
  @IsString()
  @IsOptional()
  cast?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the movie is active/published',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
