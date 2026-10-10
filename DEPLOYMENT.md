# Production Deployment Guide

This document outlines the exact procedure for safely deploying the Apna Cars application to a production environment.

## 1. Required Infrastructure

* **Compute:** Vercel (recommended) or any Node.js hosting.
* **Database:** Managed PostgreSQL (e.g., Neon, Supabase, AWS RDS).
* **Media Storage:** Cloudinary (required in serverless environments to persist images).

## 2. Environment Variables

Provide the following variables to your production environment:

* `DATABASE_URL` — Connection string to the production PostgreSQL instance.
* `NEXTAUTH_URL` — The public URL of the application (e.g., `https://www.apnacars.com`).
* `NEXTAUTH_SECRET` — A secure, random string (e.g., generated via `openssl rand -base64 32`).
* `CLOUDINARY_CLOUD_NAME` — Cloudinary identifier.
* `CLOUDINARY_API_KEY` — Cloudinary API key.
* `CLOUDINARY_API_SECRET` — Cloudinary API secret.
* `ADMIN_EMAIL` — The email address for the initial production admin account.
* `ADMIN_PASSWORD` — The password for the initial production admin account.

## 3. Database Migration Strategy

In production, you must **ONLY** use the deploy command to push schema changes safely without destroying data:

```bash
npx prisma migrate deploy
```

*Do not use `npx prisma migrate dev` or `npx prisma db push` or `npx prisma migrate reset` in production.*

## 4. Admin Bootstrap Procedure

Once the database migrations have been deployed, you must initialize the first admin account. 
Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in the production environment, then run:

```bash
npx tsx scripts/setup-admin.ts
```

This securely creates (or updates) the admin user, hashes the password via bcrypt, and sets the role to `ADMIN`. Once successful, you can optionally remove `ADMIN_PASSWORD` from the environment if you prefer.

## 5. Seed / Content Procedure

* **Do not run `npx prisma db seed` in production.** The current `prisma/seed.ts` is strictly for local development and injects demo data.
* **Content Creation:** In production, all structural content (Brands, Categories, Cars, Locations, Services) must be created manually by the Admin through the CMS (`/admin`). The production database should begin completely empty except for the admin user.

## 6. Media Configuration

Production relies on Cloudinary. The CMS will automatically detect the presence of `CLOUDINARY_CLOUD_NAME` and route all admin uploads directly to the cloud. Local `public/images` fallback is only for local development.

## 7. Security Precautions

* Never commit `.env` or `.env.local` to version control.
* Never print the `NEXTAUTH_SECRET` or `ADMIN_PASSWORD` in logs.
* Vercel will automatically run `npm run build` which typechecks and builds the application.

## 8. Production Verification Checklist

1. [ ] Database URL is connected.
2. [ ] `npx prisma migrate deploy` executed successfully.
3. [ ] `scripts/setup-admin.ts` executed successfully.
4. [ ] Site loads without errors.
5. [ ] Logging into `/admin` succeeds.
6. [ ] Uploading a test image in `/admin/media` succeeds.
7. [ ] Submitting a test lead on the public homepage works and appears in the CMS.
