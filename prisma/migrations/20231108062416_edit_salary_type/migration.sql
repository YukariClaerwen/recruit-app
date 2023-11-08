/*
  Warnings:

  - You are about to alter the column `luong_toi_thieu` on the `ViecLam` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `luong_toi_da` on the `ViecLam` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "ViecLam" ALTER COLUMN "luong_toi_thieu" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "luong_toi_da" SET DATA TYPE DECIMAL(65,30);
