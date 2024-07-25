-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "favorites" SET DEFAULT '[]';
