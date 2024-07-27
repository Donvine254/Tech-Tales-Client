/*
  Warnings:

  - You are about to drop the column `favorites` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_handle_email_idx";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favorites";

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Favorite_userId_blogId_idx" ON "Favorite"("userId", "blogId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_blogId_key" ON "Favorite"("userId", "blogId");

-- CreateIndex
CREATE INDEX "User_handle_email_username_idx" ON "User"("handle", "email", "username");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
