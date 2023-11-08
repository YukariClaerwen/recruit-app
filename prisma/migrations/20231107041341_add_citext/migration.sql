/*
  Warnings:

  - Changed the type of `email` on the `TaiKhoan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ten_tai_khoan` on the `TaiKhoan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

CREATE EXTENSION IF NOT EXISTS citext;
-- AlterTable
ALTER TABLE "TaiKhoan" 
ALTER COLUMN "email" TYPE CITEXT,
ALTER COLUMN "ten_tai_khoan" TYPE CITEXT;

