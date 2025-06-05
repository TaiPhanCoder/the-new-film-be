import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { IMovieRepository } from '../interfaces/movie.repository.interface';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  async findAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findMovieById(id: string): Promise<Movie | null> {
    return await this.movieRepository.findOne({ where: { id } });
  }

  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | null> {
    await this.movieRepository.update(id, updateMovieDto);
    return await this.findMovieById(id);
  }

  async deleteMovie(id: string): Promise<void> {
    await this.movieRepository.delete(id);
  }

  async findMoviesByGenre(genre: string): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { genre: Like(`%${genre}%`) },
      order: { createdAt: 'DESC' },
    });
  }

  async findMoviesByTitle(title: string): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { title: Like(`%${title}%`) },
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveMovies(): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
