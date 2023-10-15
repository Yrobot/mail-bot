/*
  Warnings:

  - You are about to drop the `Messge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Messge";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "cc" TEXT NOT NULL,
    "bcc" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "interfaceId" INTEGER NOT NULL,
    CONSTRAINT "Message_email_fkey" FOREIGN KEY ("email") REFERENCES "Channel" ("account") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_interfaceId_fkey" FOREIGN KEY ("interfaceId") REFERENCES "Interface" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
