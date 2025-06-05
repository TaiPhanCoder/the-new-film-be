import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';

export interface IMovieRepository {
  createMovie(createMovieDto: CreateMovieDto): Promise<Movie>;
  findAllMovies(): Promise<Movie[]>;
  findMovieById(id: string): Promise<Movie | null>;
  updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | null>;
  deleteMovie(id: string): Promise<void>;
  findMoviesByGenre(genre: string): Promise<Movie[]>;
  findMoviesByTitle(title: string): Promise<Movie[]>;
  findActiveMovies(): Promise<Movie[]>;
}

export const IMovieRepository = Symbol('IMovieRepository');
