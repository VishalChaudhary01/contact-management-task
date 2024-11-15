/*
  Warnings:

  - You are about to drop the column `Company` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `First` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Job` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Last` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `ContactInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `ContactInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ContactInfo_Email_key";

-- AlterTable
ALTER TABLE "ContactInfo" DROP COLUMN "Company",
DROP COLUMN "Email",
DROP COLUMN "First",
DROP COLUMN "Job",
DROP COLUMN "Last",
DROP COLUMN "Phone",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "job" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_email_key" ON "ContactInfo"("email");
