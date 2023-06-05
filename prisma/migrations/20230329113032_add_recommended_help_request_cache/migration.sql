-- CreateTable
CREATE TABLE "RecommendedHelpRequestCache" (
    "id" SERIAL NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "helpRequestId" INTEGER NOT NULL,

    CONSTRAINT "RecommendedHelpRequestCache_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecommendedHelpRequestCache" ADD CONSTRAINT "RecommendedHelpRequestCache_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedHelpRequestCache" ADD CONSTRAINT "RecommendedHelpRequestCache_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
