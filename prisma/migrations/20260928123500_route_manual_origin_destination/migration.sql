-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_originId_fkey";

-- DropIndex
DROP INDEX "Route_originId_destinationId_key";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "destinationId",
DROP COLUMN "originId",
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Route_origin_destination_key" ON "Route"("origin", "destination");

