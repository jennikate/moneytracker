/*
  Warnings:

  - Made the column `expenseTypeId` on table `Recipient` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expenseTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Recipient_expenseTypeId_fkey" FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipient" ("expenseTypeId", "id", "name") SELECT "expenseTypeId", "id", "name" FROM "Recipient";
DROP TABLE "Recipient";
ALTER TABLE "new_Recipient" RENAME TO "Recipient";
CREATE UNIQUE INDEX "Recipient_name_key" ON "Recipient"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
