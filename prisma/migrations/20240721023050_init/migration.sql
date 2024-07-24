-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'published';
