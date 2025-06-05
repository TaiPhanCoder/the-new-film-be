# Database Migrations

This directory contains TypeORM migration files for the database schema.

## Available Commands

### Run Migrations

```bash
npm run migration:run
```

Executes all pending migrations.

### Revert Migration

```bash
npm run migration:revert
```

Reverts the last executed migration.

### Show Migration Status

```bash
npm run migration:show
```

Shows all migrations and their status.

### Generate New Migration

```bash
npm run migration:generate -- src/migrations/MigrationName
```

Generates a new migration based on entity changes.

### Create Empty Migration

```bash
npm run migration:create -- src/migrations/MigrationName
```

Creates an empty migration file.

## Migration Files

- `1734677900000-EnableUuidExtension.ts` - Enables uuid-ossp extension for PostgreSQL UUID generation
- `1734678000000-CreateMovieTable.ts` - Creates the movies table with all necessary columns and indices
- `1734678100000-CreateAdminUser.ts` - Creates default admin user account with credentials:
  - Email: admin@thefilm.com
  - Username: admin
  - Password: admin123
  - Role: admin

## Notes

- Migrations are automatically run when the application starts (`migrationsRun: true`)
- Database synchronization is disabled (`synchronize: false`) to use migrations instead
- Make sure to have proper database credentials in your `.env` file
- Always test migrations in development before applying to production
