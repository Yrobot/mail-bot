-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "export" BOOLEAN NOT NULL DEFAULT true,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "account" TEXT NOT NULL,
    "token" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("account", "createdAt", "host", "id", "port", "status", "token", "updatedAt") SELECT "account", "createdAt", "host", "id", "port", "status", "token", "updatedAt" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_account_key" ON "Channel"("account");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
