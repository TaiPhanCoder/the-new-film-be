import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovieTable1734678000000 implements MigrationInterface {
  name = 'CreateMovieTable1734678000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'posterUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bannerUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'releaseDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'genre',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rating',
            type: 'decimal',
            precision: 3,
            scale: 1,
            isNullable: true,
          },
          {
            name: 'director',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cast',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'IDX_MOVIE_TITLE',
            columnNames: ['title'],
          },
          {
            name: 'IDX_MOVIE_GENRE',
            columnNames: ['genre'],
          },
          {
            name: 'IDX_MOVIE_ACTIVE',
            columnNames: ['isActive'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}
