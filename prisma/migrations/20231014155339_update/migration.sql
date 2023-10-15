/*
  Warnings:

  - You are about to drop the column `channelId` on the `Interface` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `Messge` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `email` to the `Interface` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Interface` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Messge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Interface" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "path" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "overlay" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Interface_email_fkey" FOREIGN KEY ("email") REFERENCES "Channel" ("account") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Interface" ("id", "overlay", "path", "status") SELECT "id", "overlay", "path", "status" FROM "Interface";
DROP TABLE "Interface";
ALTER TABLE "new_Interface" RENAME TO "Interface";
CREATE TABLE "new_Messge" (
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
    CONSTRAINT "Messge_email_fkey" FOREIGN KEY ("email") REFERENCES "Channel" ("account") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Messge_interfaceId_fkey" FOREIGN KEY ("interfaceId") REFERENCES "Interface" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Messge" ("bcc", "cc", "from", "html", "id", "interfaceId", "status", "subject", "text", "to") SELECT "bcc", "cc", "from", "html", "id", "interfaceId", "status", "subject", "text", "to" FROM "Messge";
DROP TABLE "Messge";
ALTER TABLE "new_Messge" RENAME TO "Messge";
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "account" TEXT NOT NULL,
    "token" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("account", "host", "id", "port", "status", "token") SELECT "account", "host", "id", "port", "status", "token" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_account_key" ON "Channel"("account");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
