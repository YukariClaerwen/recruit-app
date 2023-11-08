/*
  Warnings:

  - You are about to drop the column `hinh_dai_dien` on the `UngVien` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DonUngTuyen" ALTER COLUMN "trang_thai_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HoSo" ALTER COLUMN "gioi_thieu" DROP NOT NULL,
ALTER COLUMN "duoc_tim_kiem" DROP NOT NULL,
ALTER COLUMN "duoc_tai" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HocVan" ALTER COLUMN "chuyen_nganh" DROP NOT NULL,
ALTER COLUMN "truong" DROP NOT NULL,
ALTER COLUMN "tu_thang" DROP NOT NULL,
ALTER COLUMN "den_thang" DROP NOT NULL,
ALTER COLUMN "thanh_tuu" DROP NOT NULL;

-- AlterTable
ALTER TABLE "KinhNghiem" ALTER COLUMN "chuc_danh" DROP NOT NULL,
ALTER COLUMN "cong_ty" DROP NOT NULL,
ALTER COLUMN "tu_thang" DROP NOT NULL,
ALTER COLUMN "den_thang" DROP NOT NULL,
ALTER COLUMN "la_cv_hien_tai" DROP NOT NULL,
ALTER COLUMN "mo_ta" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NganhNghe" ALTER COLUMN "linh_vuc_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NhaTuyenDung" ALTER COLUMN "ten_cong_ty" DROP NOT NULL,
ALTER COLUMN "dia_chi" DROP NOT NULL,
ALTER COLUMN "quoc_gia" DROP NOT NULL,
ALTER COLUMN "nguoi_lien_he" DROP NOT NULL,
ALTER COLUMN "tu_van_vien_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PhucLoi" ALTER COLUMN "icon" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PhucLoiNhaTuyenDung" ALTER COLUMN "mo_ta" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaiKhoan" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "TrinhDo" ALTER COLUMN "ghi_chu" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UngVien" DROP COLUMN "hinh_dai_dien",
ALTER COLUMN "ho" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ViecLam" ALTER COLUMN "nha_tuyen_dung_id" DROP NOT NULL,
ALTER COLUMN "chuc_danh" DROP NOT NULL,
ALTER COLUMN "loai_viec_lam" DROP NOT NULL,
ALTER COLUMN "mo_ta" DROP NOT NULL,
ALTER COLUMN "yeu_cau" DROP NOT NULL,
ALTER COLUMN "luong_thuong_luong" DROP NOT NULL,
ALTER COLUMN "thoi_gian_lam_viec" DROP NOT NULL,
ALTER COLUMN "nguoi_lien_he" DROP NOT NULL,
ALTER COLUMN "ds_email_lien_he" DROP NOT NULL,
ALTER COLUMN "han_nhan_ho_so" DROP NOT NULL,
ALTER COLUMN "thoi_gian_dang" DROP NOT NULL,
ALTER COLUMN "luot_xem" DROP NOT NULL;
