/*
  Warnings:

  - You are about to drop the column `ten_mhom` on the `NhomNganh` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ten_nhom]` on the table `NhomNganh` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ten_nhom` to the `NhomNganh` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NhomNganh_ten_mhom_key";

-- AlterTable
ALTER TABLE "NhomNganh" DROP COLUMN "ten_mhom",
ADD COLUMN     "ten_nhom" VARCHAR(256) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NhomNganh_ten_nhom_key" ON "NhomNganh"("ten_nhom");
