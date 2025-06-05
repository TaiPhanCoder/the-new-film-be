import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { Movie } from './entities/movie.entity';
import { IMovieRepository } from './interfaces/movie.repository.interface';

@Injectable()
export class MovieService {
  constructor(
    @Inject(IMovieRepository)
    private readonly movieRepository: IMovieRepository,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<MovieResponseDto> {
    // Check if movie with same title already exists
    const existingMovies = await this.movieRepository.findMoviesByTitle(
      createMovieDto.title,
    );
    const exactMatch = existingMovies.find(
      (movie) =>
        movie.title.toLowerCase() === createMovieDto.title.toLowerCase(),
    );

    if (exactMatch) {
      throw new ConflictException('Movie with this title already exists');
    }

    const movie = await this.movieRepository.createMovie(createMovieDto);
    return this.transformToResponseDto(movie);
  }

  async findAllMovies(): Promise<MovieResponseDto[]> {
    const movies = await this.movieRepository.findAllMovies();
    return movies.map((movie) => this.transformToResponseDto(movie));
  }

  async findActiveMovies(): Promise<MovieResponseDto[]> {
    const movies = await this.movieRepository.findActiveMovies();
    return movies.map((movie) => this.transformToResponseDto(movie));
  }

  async findMovieById(id: string): Promise<MovieResponseDto> {
    const movie = await this.movieRepository.findMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return this.transformToResponseDto(movie);
  }

  async findMoviesByGenre(genre: string): Promise<MovieResponseDto[]> {
    const movies = await this.movieRepository.findMoviesByGenre(genre);
    return movies.map((movie) => this.transformToResponseDto(movie));
  }

  async findMoviesByTitle(title: string): Promise<MovieResponseDto[]> {
    const movies = await this.movieRepository.findMoviesByTitle(title);
    return movies.map((movie) => this.transformToResponseDto(movie));
  }

  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponseDto> {
    const existingMovie = await this.movieRepository.findMovieById(id);
    if (!existingMovie) {
      throw new NotFoundException('Movie not found');
    }

    // Check if updating title conflicts with existing movie
    if (updateMovieDto.title) {
      const existingMovies = await this.movieRepository.findMoviesByTitle(
        updateMovieDto.title,
      );
      const exactMatch = existingMovies.find(
        (movie) =>
          movie.title.toLowerCase() === updateMovieDto.title?.toLowerCase() &&
          movie.id !== id,
      );

      if (exactMatch) {
        throw new ConflictException('Movie with this title already exists');
      }
    }

    const updatedMovie = await this.movieRepository.updateMovie(
      id,
      updateMovieDto,
    );
    if (!updatedMovie) {
      throw new NotFoundException('Failed to update movie');
    }
    return this.transformToResponseDto(updatedMovie);
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.movieRepository.findMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.deleteMovie(id);
  }

  private transformToResponseDto(movie: Movie): MovieResponseDto {
    return new MovieResponseDto(movie);
  }
}
