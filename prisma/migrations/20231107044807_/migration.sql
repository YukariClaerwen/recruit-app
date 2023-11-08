/*
  Warnings:

  - The `loai_viec_lam` column on the `ViecLam` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `ten_tu_khoa` on the `TuKhoa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "TrinhDo_ten_trinh_do_key";

-- AlterTable
ALTER TABLE "TuKhoa" DROP COLUMN "ten_tu_khoa",
ADD COLUMN     "ten_tu_khoa" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "ViecLam" DROP COLUMN "loai_viec_lam",
ADD COLUMN     "loai_viec_lam" CITEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TuKhoa_ten_tu_khoa_key" ON "TuKhoa"("ten_tu_khoa");
