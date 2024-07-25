/*
  Warnings:

  - You are about to drop the column `social` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "social",
ADD COLUMN     "socials" JSONB DEFAULT '[]',
ALTER COLUMN "favorites" DROP DEFAULT;
