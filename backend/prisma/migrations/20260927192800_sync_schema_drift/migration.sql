-- CreateEnum
CREATE TYPE "CommunicationChannel" AS ENUM ('EMAIL', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "CommunicationDirection" AS ENUM ('OUTBOUND', 'INBOUND');

-- CreateEnum
CREATE TYPE "CommunicationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "CommunicationProvider" AS ENUM ('EMAIL', 'WHATSAPP', 'MOCK');

-- CreateTable
CREATE TABLE "SeoSettings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL DEFAULT 'Apna Car Rental',
    "homepageTitle" TEXT,
    "homepageDescription" TEXT,
    "organizationName" TEXT,
    "logoMediaId" TEXT,
    "faviconMediaId" TEXT,
    "defaultOgImageId" TEXT,
    "canonicalBaseUrl" TEXT,
    "defaultRobotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "defaultRobotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSeo" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "h1" TEXT,
    "canonicalUrl" TEXT,
    "robotsIndex" BOOLEAN NOT NULL DEFAULT true,
    "robotsFollow" BOOLEAN NOT NULL DEFAULT true,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "focusKeyword" TEXT,
    "secondaryKeywords" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 301,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternalLink" (
    "id" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "anchorText" TEXT NOT NULL,
    "destinationPath" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavigationItem" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "parentId" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavigationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadCommunication" (
    "id" UUID NOT NULL,
    "leadId" UUID NOT NULL,
    "channel" "CommunicationChannel" NOT NULL,
    "direction" "CommunicationDirection" NOT NULL,
    "status" "CommunicationStatus" NOT NULL,
    "recipient" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "provider" "CommunicationProvider" NOT NULL,
    "providerMessageId" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadCommunication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageSeo_path_key" ON "PageSeo"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_source_key" ON "Redirect"("source");

-- CreateIndex
CREATE UNIQUE INDEX "InternalLink_sourcePath_destinationPath_anchorText_key" ON "InternalLink"("sourcePath", "destinationPath", "anchorText");

-- CreateIndex
CREATE INDEX "LeadCommunication_leadId_idx" ON "LeadCommunication"("leadId");

-- AddForeignKey
ALTER TABLE "NavigationItem" ADD CONSTRAINT "NavigationItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "NavigationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadCommunication" ADD CONSTRAINT "LeadCommunication_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

