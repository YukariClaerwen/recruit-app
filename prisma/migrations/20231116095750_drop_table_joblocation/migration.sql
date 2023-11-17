/*
  Warnings:

  - You are about to drop the `ViecLamTinhThanh` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ViecLamTinhThanh" DROP CONSTRAINT "ViecLamTheoTinhThanh_TinhThanh_id";

-- DropForeignKey
ALTER TABLE "ViecLamTinhThanh" DROP CONSTRAINT "ViecLamTheoTinhThanh_ViecLam_id";

-- AlterTable
ALTER TABLE "DiaDiemNhaTuyenDung" ADD COLUMN     "branch_name" TEXT;

-- DropTable
DROP TABLE "ViecLamTinhThanh";

-- CreateIndex
CREATE INDEX "DiaDiemNhaTuyenDung_created_at_idx" ON "DiaDiemNhaTuyenDung"("created_at");
