-- CreateTable
CREATE TABLE "TakenHelpRequest" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "is_taken" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "helpRequestId" INTEGER NOT NULL,

    CONSTRAINT "TakenHelpRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TakenHelpRequest" ADD CONSTRAINT "TakenHelpRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakenHelpRequest" ADD CONSTRAINT "TakenHelpRequest_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
