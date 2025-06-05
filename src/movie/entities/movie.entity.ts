import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'movies' })
export class Movie {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the movie',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: 'The title of the movie',
  })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    example: 'Two imprisoned men bond over a number of years...',
    description: 'The description of the movie',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'The poster image URL of the movie',
  })
  @Column({ nullable: true })
  posterUrl: string;

  @ApiProperty({
    example: 'https://example.com/banner.jpg',
    description: 'The banner image URL of the movie',
  })
  @Column({ nullable: true })
  bannerUrl: string;

  @ApiProperty({
    example: '1994-09-23',
    description: 'The release date of the movie',
  })
  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @ApiProperty({
    example: 142,
    description: 'The duration of the movie in minutes',
  })
  @Column({ nullable: true })
  duration: number;

  @ApiProperty({
    example: 'Drama',
    description: 'The genre of the movie',
  })
  @Column({ nullable: true })
  genre: string;

  @ApiProperty({
    example: 9.3,
    description: 'The rating of the movie (0-10)',
  })
  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  rating: number;

  @ApiProperty({
    example: 'Frank Darabont',
    description: 'The director of the movie',
  })
  @Column({ nullable: true })
  director: string;

  @ApiProperty({
    example: 'Tim Robbins, Morgan Freeman',
    description: 'The main cast of the movie',
  })
  @Column({ type: 'text', nullable: true })
  cast: string;

  @ApiProperty({
    example: true,
    description: 'Whether the movie is active/published',
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The creation timestamp',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The last update timestamp',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
