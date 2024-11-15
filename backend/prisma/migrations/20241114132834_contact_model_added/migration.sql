-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "First" TEXT NOT NULL,
    "Last" TEXT,
    "Email" TEXT NOT NULL,
    "Phone" INTEGER NOT NULL,
    "Company" TEXT NOT NULL,
    "Job" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_Email_key" ON "ContactInfo"("Email");
