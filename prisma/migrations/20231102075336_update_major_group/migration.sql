/*
  Warnings:

  - You are about to drop the column `linh_vuc_id` on the `NganhNghe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NganhNghe" DROP CONSTRAINT "NganhNghe_LinhVuc_id";

-- AlterTable
ALTER TABLE "NganhNghe" DROP COLUMN "linh_vuc_id",
ADD COLUMN     "linhVucId" INTEGER,
ADD COLUMN     "nhom_nganh_id" INTEGER;

-- CreateTable
CREATE TABLE "NhomNganh" (
    "id" SERIAL NOT NULL,
    "ten_mhom" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'ph-suitcase-simple',

    CONSTRAINT "NhomNganh_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NhomNganh_ten_mhom_key" ON "NhomNganh"("ten_mhom");

-- AddForeignKey
ALTER TABLE "NganhNghe" ADD CONSTRAINT "NganhNghe_NhomNganh_id" FOREIGN KEY ("nhom_nganh_id") REFERENCES "NhomNganh"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
