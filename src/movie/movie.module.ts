import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './services/movie.service';
import { UploadService } from './services/upload.service';
import { MovieController } from './controllers/movie.controller';
import { UploadController } from './controllers/upload.controller';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { IMovieRepository } from './interfaces/movie.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController, UploadController],
  providers: [
    MovieService,
    UploadService,
    {
      provide: IMovieRepository,
      useClass: MovieRepository,
    },
  ],
  exports: [MovieService, UploadService],
})
export class MovieModule {}
