/*
  Warnings:

  - You are about to drop the column `ds_email_lien_he` on the `ViecLam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ViecLam" DROP COLUMN "ds_email_lien_he",
ADD COLUMN     "an_danh" BOOLEAN DEFAULT false,
ADD COLUMN     "an_lien_he" BOOLEAN DEFAULT false,
ADD COLUMN     "ds_email_cv" VARCHAR(256);

-- CreateTable
CREATE TABLE "TuKhoa" (
    "id" SERIAL NOT NULL,
    "ten_tu_khoa" VARCHAR(256) NOT NULL,
    "mo_ta" VARCHAR(256),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TuKhoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuKhoaViecLam" (
    "id" SERIAL NOT NULL,
    "tu_khoa_id" INTEGER NOT NULL,
    "viec_lam_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted_at" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TuKhoaViecLam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TuKhoa_created_at_idx" ON "TuKhoa"("created_at");

-- AddForeignKey
ALTER TABLE "TuKhoaViecLam" ADD CONSTRAINT "TuKhoaViecLam_TuKhoa_id" FOREIGN KEY ("tu_khoa_id") REFERENCES "TuKhoa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TuKhoaViecLam" ADD CONSTRAINT "TuKhoaViecLam_ViecLam_id" FOREIGN KEY ("viec_lam_id") REFERENCES "ViecLam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
