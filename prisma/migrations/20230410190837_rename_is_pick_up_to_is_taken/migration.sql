/*
  Warnings:

  - You are about to drop the column `is_pickup` on the `HelpRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HelpRequest" DROP COLUMN "is_pickup",
ADD COLUMN     "is_taken" BOOLEAN;
