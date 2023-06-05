/*
  Warnings:

  - The primary key for the `TakenHelpRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TakenHelpRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TakenHelpRequest" DROP CONSTRAINT "TakenHelpRequest_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TakenHelpRequest_pkey" PRIMARY KEY ("userId", "helpRequestId");
