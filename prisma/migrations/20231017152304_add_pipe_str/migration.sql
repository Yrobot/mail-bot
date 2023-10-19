/*
  Warnings:

  - You are about to drop the column `overlay` on the `Interface` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "export" BOOLEAN NOT NULL DEFAULT true,
    "pipeStr" TEXT,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "account" TEXT NOT NULL,
    "token" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("account", "createdAt", "export", "host", "id", "port", "status", "token", "updatedAt") SELECT "account", "createdAt", "export", "host", "id", "port", "status", "token", "updatedAt" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_account_key" ON "Channel"("account");
CREATE TABLE "new_Interface" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "pipeStr" TEXT,
    "path" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "email" TEXT NOT NULL,
    CONSTRAINT "Interface_email_fkey" FOREIGN KEY ("email") REFERENCES "Channel" ("account") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Interface" ("createdAt", "email", "id", "path", "status", "updatedAt") SELECT "createdAt", "email", "id", "path", "status", "updatedAt" FROM "Interface";
DROP TABLE "Interface";
ALTER TABLE "new_Interface" RENAME TO "Interface";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
