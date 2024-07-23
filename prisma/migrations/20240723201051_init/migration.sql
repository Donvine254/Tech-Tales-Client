-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'INACTIVE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deactivatedAt" TIMESTAMP(3);
