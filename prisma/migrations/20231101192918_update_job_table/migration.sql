/*
  Warnings:

  - You are about to drop the column `trang_thai_id` on the `DonUngTuyen` table. All the data in the column will be lost.
  - You are about to drop the column `trang_thai_id` on the `ViecLam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DonUngTuyen" DROP CONSTRAINT "DonUngTuyen_TrangThai_id";

-- DropForeignKey
ALTER TABLE "ViecLam" DROP CONSTRAINT "ViecLam_TrangThai_id";

-- AlterTable
ALTER TABLE "DonUngTuyen" DROP COLUMN "trang_thai_id",
ADD COLUMN     "trang_thai" TEXT;

-- AlterTable
ALTER TABLE "ViecLam" DROP COLUMN "trang_thai_id",
ADD COLUMN     "trang_thai_cho" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trang_thai_dang" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trang_thai_het_han" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trang_thai_nhap" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trang_thai_tam_dung" BOOLEAN NOT NULL DEFAULT false;
