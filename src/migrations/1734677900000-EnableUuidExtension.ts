import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableUuidExtension1734677900000 implements MigrationInterface {
  name = 'EnableUuidExtension1734677900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid-ossp extension for PostgreSQL
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop uuid-ossp extension
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
