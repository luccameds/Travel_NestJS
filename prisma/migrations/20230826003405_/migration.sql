-- CreateTable
CREATE TABLE "Travel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "from_location" TEXT NOT NULL,
    "to_location" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "driver" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "notes" TEXT,
    "budget" INTEGER,
    "currency" TEXT
);
