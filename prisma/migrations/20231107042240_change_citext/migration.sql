/*
  Warnings:

  - The `ten_cong_ty` column on the `NhaTuyenDung` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `loai_viec_lam` column on the `ViecLam` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[ten_trinh_do]` on the table `TrinhDo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ten_tu_khoa]` on the table `TuKhoa` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `ten_bang` on the `BangCap` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_linh_vuc` on the `LinhVuc` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_nganh` on the `NganhNghe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_ngon_ngu` on the `NgonNgu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_nhom` on the `NhomNganh` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_tinh_thanh` on the `TinhThanh` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_trinh_do` on the `TrinhDo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_tu_khoa` on the `TuKhoa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable

-- CreateIndex
CREATE UNIQUE INDEX "TrinhDo_ten_trinh_do_key" ON "TrinhDo"("ten_trinh_do");

-- CreateIndex
CREATE UNIQUE INDEX "TuKhoa_ten_tu_khoa_key" ON "TuKhoa"("ten_tu_khoa");
