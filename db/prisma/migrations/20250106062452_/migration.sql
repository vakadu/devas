/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP;
