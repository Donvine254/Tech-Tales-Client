/*
  Warnings:

  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `body` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "image" TEXT,
ADD COLUMN     "tags" TEXT,
ALTER COLUMN "status" SET DEFAULT 'published';

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
ADD COLUMN     "body" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "picture" TEXT,
ALTER COLUMN "status" DROP NOT NULL;
