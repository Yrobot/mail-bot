-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Interface" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "pipeStr" TEXT,
    "path" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "email" TEXT NOT NULL
);
INSERT INTO "new_Interface" ("createdAt", "email", "id", "path", "pipeStr", "status", "updatedAt") SELECT "createdAt", "email", "id", "path", "pipeStr", "status", "updatedAt" FROM "Interface";
DROP TABLE "Interface";
ALTER TABLE "new_Interface" RENAME TO "Interface";
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "failed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "cc" TEXT,
    "bcc" TEXT,
    "subject" TEXT NOT NULL,
    "text" TEXT,
    "html" TEXT,
    "email" TEXT,
    "interfaceId" INTEGER
);
INSERT INTO "new_Message" ("bcc", "cc", "createdAt", "email", "failed", "from", "html", "id", "interfaceId", "status", "subject", "text", "to") SELECT "bcc", "cc", "createdAt", "email", "failed", "from", "html", "id", "interfaceId", "status", "subject", "text", "to" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
