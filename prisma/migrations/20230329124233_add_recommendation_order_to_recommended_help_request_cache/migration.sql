/*
  Warnings:

  - Added the required column `recommendationOrder` to the `RecommendedHelpRequestCache` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecommendedHelpRequestCache" ADD COLUMN     "recommendationOrder" TEXT NOT NULL;
