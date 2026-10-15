-- AlterTable Service
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "startingPrice" DOUBLE PRECISION;
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "priceUnit" TEXT;

-- AlterTable Lead
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "passengers" TEXT;
