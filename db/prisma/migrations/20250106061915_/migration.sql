/*
  Warnings:

  - You are about to drop the `analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "analytics";

-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '',
    "mobile" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT '',
    "eventName" TEXT NOT NULL DEFAULT '',
    "eventType" TEXT NOT NULL DEFAULT '',
    "source" TEXT NOT NULL DEFAULT 'web',
    "metadata" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
