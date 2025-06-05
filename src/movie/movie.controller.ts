import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieResponseDto } from './dto/movie-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new movie (Admin only)' })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
    type: MovieResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 409,
    description: 'Movie with this title already exists.',
  })
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<MovieResponseDto> {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({
    status: 200,
    description: 'Return all movies.',
    type: [MovieResponseDto],
  })
  async findAllMovies(): Promise<MovieResponseDto[]> {
    return this.movieService.findAllMovies();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active movies' })
  @ApiResponse({
    status: 200,
    description: 'Return all active movies.',
    type: [MovieResponseDto],
  })
  async findActiveMovies(): Promise<MovieResponseDto[]> {
    return this.movieService.findActiveMovies();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by title' })
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'Movie title to search for',
    example: 'Shawshank',
  })
  @ApiResponse({
    status: 200,
    description: 'Return movies matching the title.',
    type: [MovieResponseDto],
  })
  async searchMoviesByTitle(
    @Query('title') title: string,
  ): Promise<MovieResponseDto[]> {
    return this.movieService.findMoviesByTitle(title);
  }

  @Get('genre/:genre')
  @ApiOperation({ summary: 'Get movies by genre' })
  @ApiParam({
    name: 'genre',
    description: 'Movie genre',
    example: 'Drama',
  })
  @ApiResponse({
    status: 200,
    description: 'Return movies of the specified genre.',
    type: [MovieResponseDto],
  })
  async findMoviesByGenre(
    @Param('genre') genre: string,
  ): Promise<MovieResponseDto[]> {
    return this.movieService.findMoviesByGenre(genre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiParam({
    name: 'id',
    description: 'Movie ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the movie.',
    type: MovieResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async findMovieById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MovieResponseDto> {
    return this.movieService.findMovieById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a movie (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'Movie ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully updated.',
    type: MovieResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @ApiResponse({
    status: 409,
    description: 'Movie with this title already exists.',
  })
  async updateMovie(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponseDto> {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a movie (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'Movie ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async deleteMovie(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.movieService.deleteMovie(id);
  }
}
