/*
  Warnings:

  - A unique constraint covering the columns `[ten_tinh_thanh]` on the table `TinhThanh` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `ten_bang` on the `BangCap` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_cap_bac` on the `CapBac` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_linh_vuc` on the `LinhVuc` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_nganh` on the `NganhNghe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_ngon_ngu` on the `NgonNgu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_nhom` on the `NhomNganh` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_phuc_loi` on the `PhucLoi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_quyen` on the `Quyen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_tinh_thanh` on the `TinhThanh` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_trinh_do` on the `TrinhDo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BangCap" DROP COLUMN "ten_bang",
ADD COLUMN     "ten_bang" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "CapBac" DROP COLUMN "ten_cap_bac",
ADD COLUMN     "ten_cap_bac" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "LinhVuc" DROP COLUMN "ten_linh_vuc",
ADD COLUMN     "ten_linh_vuc" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "NganhNghe" DROP COLUMN "ten_nganh",
ADD COLUMN     "ten_nganh" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "NgonNgu" DROP COLUMN "ten_ngon_ngu",
ADD COLUMN     "ten_ngon_ngu" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "NhomNganh" DROP COLUMN "ten_nhom",
ADD COLUMN     "ten_nhom" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "PhucLoi" DROP COLUMN "ten_phuc_loi",
ADD COLUMN     "ten_phuc_loi" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quyen" DROP COLUMN "ten_quyen",
ADD COLUMN     "ten_quyen" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "TinhThanh" DROP COLUMN "ten_tinh_thanh",
ADD COLUMN     "ten_tinh_thanh" CITEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrinhDo" DROP COLUMN "ten_trinh_do",
ADD COLUMN     "ten_trinh_do" CITEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CapBac_ten_cap_bac_key" ON "CapBac"("ten_cap_bac");

-- CreateIndex
CREATE UNIQUE INDEX "LinhVuc_ten_linh_vuc_key" ON "LinhVuc"("ten_linh_vuc");

-- CreateIndex
CREATE UNIQUE INDEX "NganhNghe_ten_nganh_key" ON "NganhNghe"("ten_nganh");

-- CreateIndex
CREATE UNIQUE INDEX "NgonNgu_ten_ngon_ngu_key" ON "NgonNgu"("ten_ngon_ngu");

-- CreateIndex
CREATE UNIQUE INDEX "NhomNganh_ten_nhom_key" ON "NhomNganh"("ten_nhom");

-- CreateIndex
CREATE UNIQUE INDEX "TinhThanh_ten_tinh_thanh_key" ON "TinhThanh"("ten_tinh_thanh");
