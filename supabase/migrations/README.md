# Database Migrations

This folder contains SQL migration files for the Supabase database.

## How to Use

When setting up a new Supabase project:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order (001, 002, 003, etc.)

## Migration Naming Convention

Files are named with a numeric prefix to ensure correct execution order:

```
001_create_users_profile.sql
002_create_courses.sql
003_create_enrollments.sql
```

## Current Migrations

| File | Description |
|------|-------------|
| (none yet) | Migrations will be added as we implement database features |

## Notes

- Always run migrations in order
- The `auth.users` table is managed by Supabase Auth automatically
- Custom tables reference `auth.users` via foreign keys
