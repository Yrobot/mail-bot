-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "failed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT,
    "to" TEXT,
    "cc" TEXT,
    "bcc" TEXT,
    "subject" TEXT,
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
