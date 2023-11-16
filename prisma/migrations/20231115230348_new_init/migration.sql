-- DropForeignKey
ALTER TABLE "NhaTuyenDung" DROP CONSTRAINT "NTD_TinhThanh_id";

-- AlterTable
ALTER TABLE "TaiKhoan" ADD COLUMN     "resetToken" TEXT;

-- CreateTable
CREATE TABLE "DiaDiemNhaTuyenDung" (
    "id" SERIAL NOT NULL,
    "tinh_thanh_id" INTEGER NOT NULL,
    "nha_tuyen_dung_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiaDiemNhaTuyenDung_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiaDiemNhaTuyenDung" ADD CONSTRAINT "DiaDiemNTD_NTD_id" FOREIGN KEY ("nha_tuyen_dung_id") REFERENCES "NhaTuyenDung"("nha_tuyen_dung_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DiaDiemNhaTuyenDung" ADD CONSTRAINT "DiaDiemNTD_TinhThanh_id" FOREIGN KEY ("tinh_thanh_id") REFERENCES "TinhThanh"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
