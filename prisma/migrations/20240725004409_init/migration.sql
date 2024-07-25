/*
  Warnings:

  - The values [DELETED] on the enum `CommentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CommentStatus_new" AS ENUM ('VISIBLE', 'FLAGGED', 'HIDDEN');
ALTER TABLE "Comment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Comment" ALTER COLUMN "status" TYPE "CommentStatus_new" USING ("status"::text::"CommentStatus_new");
ALTER TYPE "CommentStatus" RENAME TO "CommentStatus_old";
ALTER TYPE "CommentStatus_new" RENAME TO "CommentStatus";
DROP TYPE "CommentStatus_old";
ALTER TABLE "Comment" ALTER COLUMN "status" SET DEFAULT 'VISIBLE';
COMMIT;

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_userId_fkey";

-- DropIndex
DROP INDEX "Blog_title_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "socialMedia" JSONB DEFAULT '[]',
ALTER COLUMN "favorites" DROP NOT NULL;

-- DropTable
DROP TABLE "SocialMedia";
