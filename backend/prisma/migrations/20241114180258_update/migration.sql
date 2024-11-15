/*
  Warnings:

  - You are about to drop the column `job` on the `ContactInfo` table. All the data in the column will be lost.
  - Added the required column `jobTitle` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactInfo" DROP COLUMN "job",
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE BIGINT;
