-- AlterTable
ALTER TABLE "NhaTuyenDung" ADD COLUMN     "cover" TEXT;

-- AlterTable
ALTER TABLE "PhucLoiNhaTuyenDung" ALTER COLUMN "mo_ta" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TaiKhoan" ALTER COLUMN "mat_khau" SET DATA TYPE TEXT;
