/*
  Warnings:

  - You are about to drop the column `date_of_born` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `action_datetime` on the `UserHelpRequestAction` table. All the data in the column will be lost.
  - You are about to drop the column `action_type` on the `UserHelpRequestAction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "date_of_born",
DROP COLUMN "sex",
ADD COLUMN     "dateOfBirth" DATE,
ADD COLUMN     "gender" TEXT;

-- AlterTable
ALTER TABLE "UserHelpRequestAction" DROP COLUMN "action_datetime",
DROP COLUMN "action_type",
ADD COLUMN     "actionDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "actionType" TEXT;
