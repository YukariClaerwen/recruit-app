/*
  Warnings:

  - You are about to drop the column `avatar` on the `TaiKhoan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaiKhoan" DROP COLUMN "avatar",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "ten_tai_khoan" DROP NOT NULL,
ALTER COLUMN "mat_khau" DROP NOT NULL;
