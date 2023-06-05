/*
  Warnings:

  - The primary key for the `UserPushToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserPushToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPushToken" DROP CONSTRAINT "UserPushToken_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserPushToken_pkey" PRIMARY KEY ("userId", "expoPushToken");
