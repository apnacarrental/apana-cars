-- AlterTable Service
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "showInQuickBar" BOOLEAN NOT NULL DEFAULT true;
