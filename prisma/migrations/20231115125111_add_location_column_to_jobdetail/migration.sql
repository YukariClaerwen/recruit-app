-- AlterTable
ALTER TABLE "ViecLam" ADD COLUMN     "dia_diem_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_TinhThanh_id" FOREIGN KEY ("dia_diem_id") REFERENCES "TinhThanh"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
