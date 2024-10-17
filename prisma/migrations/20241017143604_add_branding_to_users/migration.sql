/*
  Warnings:

  - You are about to drop the column `brading` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "brading",
ADD COLUMN     "branding" TEXT DEFAULT '#01142d';
