-- CreateTable
CREATE TABLE "UserPushToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expoPushToken" TEXT NOT NULL,

    CONSTRAINT "UserPushToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPushToken" ADD CONSTRAINT "UserPushToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
