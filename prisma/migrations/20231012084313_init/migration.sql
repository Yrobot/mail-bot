-- CreateTable
CREATE TABLE "Messge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "cc" TEXT NOT NULL,
    "bcc" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "channelId" INTEGER NOT NULL,
    "interfaceId" INTEGER NOT NULL,
    CONSTRAINT "Messge_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Messge_interfaceId_fkey" FOREIGN KEY ("interfaceId") REFERENCES "Interface" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
