/*
  Warnings:

  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Analytics";

-- CreateTable
CREATE TABLE "analytics" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '',
    "mobile" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT '',
    "eventName" TEXT NOT NULL DEFAULT '',
    "eventType" TEXT NOT NULL DEFAULT '',
    "source" TEXT NOT NULL DEFAULT 'web',
    "metadata" JSONB DEFAULT '{}',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);
