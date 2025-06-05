import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { IMovieRepository } from './interfaces/movie.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: IMovieRepository,
      useClass: MovieRepository,
    },
  ],
  exports: [MovieService],
})
export class MovieModule {}
