-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'DELETED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB DEFAULT '{"cookies": false, "newsletter_subscription": "false", "email_notifications": "false", "analytics": "false"}';
