/*
  Warnings:

  - You are about to drop the column `trang_thai_cho` on the `ViecLam` table. All the data in the column will be lost.
  - You are about to drop the column `trang_thai_dang` on the `ViecLam` table. All the data in the column will be lost.
  - You are about to drop the column `trang_thai_het_han` on the `ViecLam` table. All the data in the column will be lost.
  - You are about to drop the column `trang_thai_nhap` on the `ViecLam` table. All the data in the column will be lost.
  - You are about to drop the column `trang_thai_tam_dung` on the `ViecLam` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ten_ngon_ngu]` on the table `NgonNgu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thao_tac` to the `ViecLam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trang_thai` to the `ViecLam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ViecLam" DROP COLUMN "trang_thai_cho",
DROP COLUMN "trang_thai_dang",
DROP COLUMN "trang_thai_het_han",
DROP COLUMN "trang_thai_nhap",
DROP COLUMN "trang_thai_tam_dung",
ADD COLUMN     "luong_loai_tien" INTEGER DEFAULT 0,
ADD COLUMN     "thao_tac" JSONB NOT NULL,
ADD COLUMN     "trang_thai" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NgonNgu_ten_ngon_ngu_key" ON "NgonNgu"("ten_ngon_ngu");
