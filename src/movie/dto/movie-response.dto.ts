import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';

export class MovieResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the movie',
  })
  id: string;

  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: 'The title of the movie',
  })
  title: string;

  @ApiProperty({
    example:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    description: 'The description of the movie',
  })
  description: string;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'The poster image URL of the movie',
  })
  posterUrl: string;

  @ApiProperty({
    example: 'https://example.com/banner.jpg',
    description: 'The banner image URL of the movie',
  })
  bannerUrl: string;

  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'The video URL of the movie',
  })
  videoUrl: string;

  @ApiProperty({
    example: '1994-09-23',
    description: 'The release date of the movie',
  })
  releaseDate: Date;

  @ApiProperty({
    example: 142,
    description: 'The duration of the movie in minutes',
  })
  duration: number;

  @ApiProperty({
    example: 'Drama',
    description: 'The genre of the movie',
  })
  genre: string;

  @ApiProperty({
    example: 9.3,
    description: 'The rating of the movie (0-10)',
  })
  rating: number;

  @ApiProperty({
    example: 'Frank Darabont',
    description: 'The director of the movie',
  })
  director: string;

  @ApiProperty({
    example: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    description: 'The main cast of the movie',
  })
  cast: string;

  @ApiProperty({
    example: true,
    description: 'Whether the movie is active/published',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The last update timestamp',
  })
  updatedAt: Date;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.description = movie.description;
    this.posterUrl = movie.posterUrl;
    this.bannerUrl = movie.bannerUrl;
    this.videoUrl = movie.videoUrl;
    this.releaseDate = movie.releaseDate;
    this.duration = movie.duration;
    this.genre = movie.genre;
    this.rating = movie.rating;
    this.director = movie.director;
    this.cast = movie.cast;
    this.isActive = movie.isActive;
    this.createdAt = movie.createdAt;
    this.updatedAt = movie.updatedAt;
  }
}
