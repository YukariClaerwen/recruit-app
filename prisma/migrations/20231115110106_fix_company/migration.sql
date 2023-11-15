-- AlterTable
ALTER TABLE "HoSo" ADD COLUMN     "cv_url" TEXT;

-- AlterTable
ALTER TABLE "NhaTuyenDung" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
