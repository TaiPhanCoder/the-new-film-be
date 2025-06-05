import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateAdminUser1734678100000 implements MigrationInterface {
  name = 'CreateAdminUser1734678100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Hash password for admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Insert admin user
    await queryRunner.query(
      `INSERT INTO "users" ("id", "name", "email", "password", "username", "role", "isActive", "createdAt", "updatedAt") 
       VALUES (uuid_generate_v4(), 'Administrator', 'admin@thefilm.com', $1, 'admin', 'admin', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [hashedPassword],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove admin user
    await queryRunner.query(
      `DELETE FROM "users" WHERE "email" = 'admin@thefilm.com' AND "role" = 'admin'`,
    );
  }
}
