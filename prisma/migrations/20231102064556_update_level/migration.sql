/*
  Warnings:

  - A unique constraint covering the columns `[ten_cap_bac]` on the table `CapBac` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ViecLam" ALTER COLUMN "thao_tac" DROP NOT NULL,
ALTER COLUMN "trang_thai" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CapBac_ten_cap_bac_key" ON "CapBac"("ten_cap_bac");
