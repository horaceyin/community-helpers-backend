/*
  Warnings:

  - You are about to drop the column `location` on the `HelpRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HelpRequest" DROP COLUMN "location",
ADD COLUMN     "district" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "date_of_born" DATE,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "sex" TEXT;

-- CreateTable
CREATE TABLE "UserHelpRequestAction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "helpRequestId" INTEGER NOT NULL,
    "action_type" TEXT,
    "action_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHelpRequestAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHelpRequestAction" ADD CONSTRAINT "UserHelpRequestAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHelpRequestAction" ADD CONSTRAINT "UserHelpRequestAction_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
