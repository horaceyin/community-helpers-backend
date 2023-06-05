/*
  Warnings:

  - You are about to drop the column `HelpCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "HelpCount",
ADD COLUMN     "helperCount" INTEGER DEFAULT 0;
