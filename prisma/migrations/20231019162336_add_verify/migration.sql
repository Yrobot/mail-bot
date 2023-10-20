-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "export" BOOLEAN NOT NULL DEFAULT true,
    "pipeStr" TEXT,
    "verify" BOOLEAN NOT NULL DEFAULT false,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "account" TEXT NOT NULL,
    "token" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("account", "createdAt", "export", "host", "id", "pipeStr", "port", "status", "token", "updatedAt") SELECT "account", "createdAt", "export", "host", "id", "pipeStr", "port", "status", "token", "updatedAt" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_account_key" ON "Channel"("account");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
