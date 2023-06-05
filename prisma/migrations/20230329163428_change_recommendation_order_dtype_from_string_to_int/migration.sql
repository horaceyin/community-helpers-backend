/*
  Warnings:

  - Changed the type of `recommendationOrder` on the `RecommendedHelpRequestCache` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RecommendedHelpRequestCache" DROP COLUMN "recommendationOrder",
ADD COLUMN     "recommendationOrder" INTEGER NOT NULL;
