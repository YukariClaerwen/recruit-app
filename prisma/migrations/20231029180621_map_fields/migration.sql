/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "QT_TaiKhoan_id";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "TaiKhoan" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "ten_tai_khoan" VARCHAR(256) NOT NULL,
    "mat_khau" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaiKhoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quyen" (
    "id" SERIAL NOT NULL,
    "ten_quyen" VARCHAR(256) NOT NULL,
    "mo_ta" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quyen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhanQuyen" (
    "id" SERIAL NOT NULL,
    "quyen_id" INTEGER NOT NULL,
    "tai_khoan_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhanQuyen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuanTri" (
    "tai_khoan_id" INTEGER NOT NULL,
    "quan_tri_id" SERIAL NOT NULL,
    "ho_ten" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuanTri_pkey" PRIMARY KEY ("tai_khoan_id")
);

-- CreateTable
CREATE TABLE "TuVanVien" (
    "tai_khoan_id" INTEGER NOT NULL,
    "tu_van_vien_id" SERIAL NOT NULL,
    "ho_ten" VARCHAR(256) NOT NULL,
    "so_dien_thoai" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TuVanVien_pkey" PRIMARY KEY ("tai_khoan_id")
);

-- CreateTable
CREATE TABLE "UngVien" (
    "tai_khoan_id" INTEGER NOT NULL,
    "ung_vien_id" SERIAL NOT NULL,
    "ho" VARCHAR(256) NOT NULL,
    "ten" VARCHAR(256) NOT NULL,
    "gioi_tinh" BOOLEAN NOT NULL,
    "ngay_sinh" TIMESTAMP(3) NOT NULL,
    "quoc_tich" BOOLEAN NOT NULL DEFAULT true,
    "hon_nhan" BOOLEAN NOT NULL DEFAULT false,
    "chuc_danh" VARCHAR(256) NOT NULL,
    "nam_kinh_nghiem" INTEGER NOT NULL DEFAULT 0,
    "hinh_dai_dien" VARCHAR(256) NOT NULL,
    "dia_chi" VARCHAR(256) NOT NULL,
    "so_dien_thoai" VARCHAR(256) NOT NULL,
    "cap_bac_id" INTEGER NOT NULL,
    "bang_cap_id" INTEGER NOT NULL,
    "tu_van_vien_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UngVien_pkey" PRIMARY KEY ("tai_khoan_id")
);

-- CreateTable
CREATE TABLE "NhaTuyenDung" (
    "tai_khoan_id" INTEGER NOT NULL,
    "nha_tuyen_dung_id" SERIAL NOT NULL,
    "ten_cong_ty" VARCHAR(256) NOT NULL,
    "dia_chi" VARCHAR(256) NOT NULL,
    "quy_mo_id" INTEGER,
    "quoc_gia" VARCHAR(256) NOT NULL,
    "nguoi_lien_he" VARCHAR(256) NOT NULL,
    "linh_vuc_id" INTEGER,
    "mo_ta" TEXT,
    "logo" VARCHAR(256),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tinh_thanh_id" INTEGER,
    "tu_van_vien_id" INTEGER NOT NULL,

    CONSTRAINT "NhaTuyenDung_pkey" PRIMARY KEY ("tai_khoan_id")
);

-- CreateTable
CREATE TABLE "CapBac" (
    "id" SERIAL NOT NULL,
    "ten_cap_bac" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CapBac_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoaiTrangThai" (
    "id" SERIAL NOT NULL,
    "ten_loai_trang_thai" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoaiTrangThai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrangThai" (
    "id" SERIAL NOT NULL,
    "ten_trang_thai" VARCHAR(256) NOT NULL,
    "loai_trang_thai_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrangThai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NgonNgu" (
    "id" SERIAL NOT NULL,
    "ten_ngon_ngu" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NgonNgu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuyMo" (
    "id" SERIAL NOT NULL,
    "quy_mo" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuyMo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TinhThanh" (
    "id" SERIAL NOT NULL,
    "ten_tinh_thanh" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TinhThanh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViecLam" (
    "id" SERIAL NOT NULL,
    "trang_thai_id" INTEGER,
    "nganh_nghe_id" INTEGER,
    "cap_bac_id" INTEGER,
    "tai_khoan_id" INTEGER NOT NULL,
    "nha_tuyen_dung_id" INTEGER NOT NULL,
    "chuc_danh" VARCHAR(256) NOT NULL,
    "linh_vuc_id" INTEGER,
    "loai_viec_lam" VARCHAR(256) NOT NULL,
    "mo_ta" TEXT NOT NULL,
    "yeu_cau" TEXT NOT NULL,
    "luong_toi_thieu" DOUBLE PRECISION,
    "luong_toi_da" DOUBLE PRECISION,
    "luong_thuong_luong" BOOLEAN NOT NULL DEFAULT false,
    "thoi_gian_lam_viec" VARCHAR(256) NOT NULL,
    "nguoi_lien_he" VARCHAR(256) NOT NULL,
    "ds_email_lien_he" VARCHAR(256) NOT NULL,
    "han_nhan_ho_so" TIMESTAMP(3) NOT NULL,
    "thoi_gian_dang" TIMESTAMP(3) NOT NULL,
    "luot_xem" INTEGER NOT NULL DEFAULT 0,
    "so_luong" INTEGER,
    "tu_tuoi" INTEGER,
    "den_tuoi" INTEGER,
    "ngon_ngu_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ViecLam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BangCap" (
    "id" SERIAL NOT NULL,
    "ten_bang" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BangCap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HoSo" (
    "id" SERIAL NOT NULL,
    "ung_vien_id" INTEGER NOT NULL,
    "gioi_thieu" VARCHAR(256) NOT NULL,
    "duoc_tim_kiem" BOOLEAN NOT NULL DEFAULT true,
    "duoc_tai" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HoSo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HocVan" (
    "id" SERIAL NOT NULL,
    "ho_so_id" INTEGER NOT NULL,
    "bang_cap_id" INTEGER,
    "chuyen_nganh" VARCHAR(256) NOT NULL,
    "truong" VARCHAR(256) NOT NULL,
    "tu_thang" TIMESTAMP(3) NOT NULL,
    "den_thang" TIMESTAMP(3) NOT NULL,
    "thanh_tuu" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HocVan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KinhNghiem" (
    "id" SERIAL NOT NULL,
    "ho_so_id" INTEGER NOT NULL,
    "chuc_danh" VARCHAR(256) NOT NULL,
    "cong_ty" VARCHAR(256) NOT NULL,
    "tu_thang" TIMESTAMP(3) NOT NULL,
    "den_thang" TIMESTAMP(3) NOT NULL,
    "la_cv_hien_tai" BOOLEAN NOT NULL DEFAULT false,
    "mo_ta" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KinhNghiem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinhVuc" (
    "id" SERIAL NOT NULL,
    "ten_linh_vuc" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinhVuc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NganhNghe" (
    "id" SERIAL NOT NULL,
    "ten_nganh" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'ph-suitcase-simple',
    "linh_vuc_id" INTEGER NOT NULL,

    CONSTRAINT "NganhNghe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NgoaiNgu" (
    "id" SERIAL NOT NULL,
    "ho_so_id" INTEGER NOT NULL,
    "ngon_ngu_id" INTEGER,
    "trinh_do_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NgoaiNgu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrinhDo" (
    "id" SERIAL NOT NULL,
    "ten_trinh_do" VARCHAR(256) NOT NULL,
    "ghi_chu" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrinhDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViecLamYeuThich" (
    "id" SERIAL NOT NULL,
    "viec_lam_id" INTEGER NOT NULL,
    "ung_vien_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ViecLamYeuThich_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonUngTuyen" (
    "id" SERIAL NOT NULL,
    "viec_lam_id" INTEGER NOT NULL,
    "ung_vien_id" INTEGER NOT NULL,
    "nha_tuyen_dung_id" INTEGER NOT NULL,
    "trang_thai_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonUngTuyen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViecLamTinhThanh" (
    "id" SERIAL NOT NULL,
    "viec_lam_id" INTEGER NOT NULL,
    "tinh_thanh_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ViecLamTinhThanh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CongTyYeuThich" (
    "id" SERIAL NOT NULL,
    "ung_vien_id" INTEGER NOT NULL,
    "nha_tuyen_dung_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CongTyYeuThich_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NganhNgheNhaTuyenDung" (
    "id" SERIAL NOT NULL,
    "nha_tuyen_dung_id" INTEGER NOT NULL,
    "nganh_nghe_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NganhNgheNhaTuyenDung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhucLoi" (
    "id" SERIAL NOT NULL,
    "ten_phuc_loi" VARCHAR(256) NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhucLoi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhucLoiNhaTuyenDung" (
    "id" SERIAL NOT NULL,
    "nha_tuyen_dung_id" INTEGER NOT NULL,
    "phuc_loi_id" INTEGER NOT NULL,
    "mo_ta" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PhucLoiNhaTuyenDung_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_email_key" ON "TaiKhoan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_ten_tai_khoan_key" ON "TaiKhoan"("ten_tai_khoan");

-- CreateIndex
CREATE INDEX "TaiKhoan_created_at_idx" ON "TaiKhoan"("created_at");

-- CreateIndex
CREATE INDEX "Quyen_created_at_idx" ON "Quyen"("created_at");

-- CreateIndex
CREATE INDEX "PhanQuyen_created_at_idx" ON "PhanQuyen"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "QuanTri_quan_tri_id_key" ON "QuanTri"("quan_tri_id");

-- CreateIndex
CREATE INDEX "QuanTri_created_at_idx" ON "QuanTri"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "TuVanVien_tu_van_vien_id_key" ON "TuVanVien"("tu_van_vien_id");

-- CreateIndex
CREATE INDEX "TuVanVien_created_at_idx" ON "TuVanVien"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "UngVien_ung_vien_id_key" ON "UngVien"("ung_vien_id");

-- CreateIndex
CREATE INDEX "UngVien_created_at_idx" ON "UngVien"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "NhaTuyenDung_nha_tuyen_dung_id_key" ON "NhaTuyenDung"("nha_tuyen_dung_id");

-- CreateIndex
CREATE INDEX "NhaTuyenDung_nha_tuyen_dung_id_idx" ON "NhaTuyenDung"("nha_tuyen_dung_id");

-- CreateIndex
CREATE INDEX "CapBac_created_at_idx" ON "CapBac"("created_at");

-- CreateIndex
CREATE INDEX "LoaiTrangThai_created_at_idx" ON "LoaiTrangThai"("created_at");

-- CreateIndex
CREATE INDEX "TrangThai_created_at_idx" ON "TrangThai"("created_at");

-- CreateIndex
CREATE INDEX "NgonNgu_created_at_idx" ON "NgonNgu"("created_at");

-- CreateIndex
CREATE INDEX "QuyMo_created_at_idx" ON "QuyMo"("created_at");

-- CreateIndex
CREATE INDEX "TinhThanh_created_at_idx" ON "TinhThanh"("created_at");

-- CreateIndex
CREATE INDEX "ViecLam_created_at_idx" ON "ViecLam"("created_at");

-- CreateIndex
CREATE INDEX "BangCap_created_at_idx" ON "BangCap"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "HoSo_ung_vien_id_key" ON "HoSo"("ung_vien_id");

-- CreateIndex
CREATE INDEX "HoSo_created_at_idx" ON "HoSo"("created_at");

-- CreateIndex
CREATE INDEX "HocVan_created_at_idx" ON "HocVan"("created_at");

-- CreateIndex
CREATE INDEX "KinhNghiem_created_at_idx" ON "KinhNghiem"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "LinhVuc_ten_linh_vuc_key" ON "LinhVuc"("ten_linh_vuc");

-- CreateIndex
CREATE INDEX "LinhVuc_created_at_idx" ON "LinhVuc"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "NganhNghe_ten_nganh_key" ON "NganhNghe"("ten_nganh");

-- CreateIndex
CREATE INDEX "NganhNghe_created_at_idx" ON "NganhNghe"("created_at");

-- CreateIndex
CREATE INDEX "NgoaiNgu_created_at_idx" ON "NgoaiNgu"("created_at");

-- CreateIndex
CREATE INDEX "TrinhDo_created_at_idx" ON "TrinhDo"("created_at");

-- CreateIndex
CREATE INDEX "ViecLamYeuThich_created_at_idx" ON "ViecLamYeuThich"("created_at");

-- CreateIndex
CREATE INDEX "DonUngTuyen_created_at_idx" ON "DonUngTuyen"("created_at");

-- CreateIndex
CREATE INDEX "ViecLamTinhThanh_created_at_idx" ON "ViecLamTinhThanh"("created_at");

-- CreateIndex
CREATE INDEX "CongTyYeuThich_created_at_idx" ON "CongTyYeuThich"("created_at");

-- CreateIndex
CREATE INDEX "NganhNgheNhaTuyenDung_created_at_idx" ON "NganhNgheNhaTuyenDung"("created_at");

-- CreateIndex
CREATE INDEX "PhucLoi_created_at_idx" ON "PhucLoi"("created_at");

-- CreateIndex
CREATE INDEX "PhucLoiNhaTuyenDung_created_at_idx" ON "PhucLoiNhaTuyenDung"("created_at");

-- AddForeignKey
ALTER TABLE "PhanQuyen" ADD CONSTRAINT "PhanQuyen_Quyen_id" FOREIGN KEY ("quyen_id") REFERENCES "Quyen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhanQuyen" ADD CONSTRAINT "PhanQuyen_TaiKhoan_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuanTri" ADD CONSTRAINT "QT_TaiKhoan_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TuVanVien" ADD CONSTRAINT "TVV_TaiKhoan_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UngVien" ADD CONSTRAINT "UV_TaiKhoan_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UngVien" ADD CONSTRAINT "UngVien_CapBac_id" FOREIGN KEY ("cap_bac_id") REFERENCES "CapBac"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UngVien" ADD CONSTRAINT "UngVien_BangCap_id" FOREIGN KEY ("bang_cap_id") REFERENCES "BangCap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UngVien" ADD CONSTRAINT "UngVien_TuVanVien_id" FOREIGN KEY ("tu_van_vien_id") REFERENCES "TuVanVien"("tai_khoan_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhaTuyenDung" ADD CONSTRAINT "NTD_LinhVuc_id" FOREIGN KEY ("linh_vuc_id") REFERENCES "LinhVuc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhaTuyenDung" ADD CONSTRAINT "NTD_TaiKhoan_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhaTuyenDung" ADD CONSTRAINT "NTD_TinhThanh_id" FOREIGN KEY ("tinh_thanh_id") REFERENCES "TinhThanh"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhaTuyenDung" ADD CONSTRAINT "NTD_QuyMo_id" FOREIGN KEY ("quy_mo_id") REFERENCES "QuyMo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NhaTuyenDung" ADD CONSTRAINT "NTD_TuVanVien_id" FOREIGN KEY ("tu_van_vien_id") REFERENCES "TuVanVien"("tai_khoan_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TrangThai" ADD CONSTRAINT "TrangThai_Loai_id" FOREIGN KEY ("loai_trang_thai_id") REFERENCES "LoaiTrangThai"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_CapBac_id" FOREIGN KEY ("cap_bac_id") REFERENCES "CapBac"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_LinhVuc_id" FOREIGN KEY ("linh_vuc_id") REFERENCES "LinhVuc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_NganhNghe_id" FOREIGN KEY ("nganh_nghe_id") REFERENCES "NganhNghe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_NgonNgu_id" FOREIGN KEY ("ngon_ngu_id") REFERENCES "NgonNgu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_TrangThai_id" FOREIGN KEY ("trang_thai_id") REFERENCES "TrangThai"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_NguoiDang_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLam" ADD CONSTRAINT "ViecLam_NhaTuyenDung_id" FOREIGN KEY ("nha_tuyen_dung_id") REFERENCES "NhaTuyenDung"("nha_tuyen_dung_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HoSo" ADD CONSTRAINT "HoSo_UngVien_id" FOREIGN KEY ("ung_vien_id") REFERENCES "UngVien"("ung_vien_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HocVan" ADD CONSTRAINT "HocVan_HoSo_id" FOREIGN KEY ("ho_so_id") REFERENCES "HoSo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HocVan" ADD CONSTRAINT "HocVan_Bang_cap_id" FOREIGN KEY ("bang_cap_id") REFERENCES "BangCap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "KinhNghiem" ADD CONSTRAINT "KinhNghiem_HoSo_id" FOREIGN KEY ("ho_so_id") REFERENCES "HoSo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NganhNghe" ADD CONSTRAINT "NganhNghe_LinhVuc_id" FOREIGN KEY ("linh_vuc_id") REFERENCES "LinhVuc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NgoaiNgu" ADD CONSTRAINT "NgoaiNgu_HoSo_id" FOREIGN KEY ("ho_so_id") REFERENCES "HoSo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NgoaiNgu" ADD CONSTRAINT "NgoaiNgu_TrinhDo_id" FOREIGN KEY ("trinh_do_id") REFERENCES "TrinhDo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NgoaiNgu" ADD CONSTRAINT "NgoaiNgu_NgonNgu_id" FOREIGN KEY ("ngon_ngu_id") REFERENCES "NgonNgu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLamYeuThich" ADD CONSTRAINT "VLYT_ViecLam_id" FOREIGN KEY ("viec_lam_id") REFERENCES "ViecLam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLamYeuThich" ADD CONSTRAINT "VLYT_UngVien_id" FOREIGN KEY ("ung_vien_id") REFERENCES "UngVien"("ung_vien_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonUngTuyen" ADD CONSTRAINT "DonUngTuyen_ViecLam_id" FOREIGN KEY ("viec_lam_id") REFERENCES "ViecLam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonUngTuyen" ADD CONSTRAINT "DonUngTuyen_UngVien_id" FOREIGN KEY ("ung_vien_id") REFERENCES "UngVien"("ung_vien_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonUngTuyen" ADD CONSTRAINT "DonUngTuyen_NTD_id" FOREIGN KEY ("nha_tuyen_dung_id") REFERENCES "NhaTuyenDung"("nha_tuyen_dung_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonUngTuyen" ADD CONSTRAINT "DonUngTuyen_TrangThai_id" FOREIGN KEY ("trang_thai_id") REFERENCES "TrangThai"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLamTinhThanh" ADD CONSTRAINT "ViecLamTheoTinhThanh_ViecLam_id" FOREIGN KEY ("viec_lam_id") REFERENCES "ViecLam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ViecLamTinhThanh" ADD CONSTRAINT "ViecLamTheoTinhThanh_TinhThanh_id" FOREIGN KEY ("tinh_thanh_id") REFERENCES "TinhThanh"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CongTyYeuThich" ADD CONSTRAINT "CongTyYeuThich_UngVien_id" FOREIGN KEY ("ung_vien_id") REFERENCES "UngVien"("ung_vien_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CongTyYeuThich" ADD CONSTRAINT "CongTyYeuThich_NTD_id" FOREIGN KEY ("nha_tuyen_dung_id") REFERENCES "NhaTuyenDung"("nha_tuyen_dung_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NganhNgheNhaTuyenDung" ADD CONSTRAINT "NganhNgheNTD_NTD_id" FOREIGN KEY ("nha_tuyen_dung_id") REFERENCES "NhaTuyenDung"("nha_tuyen_dung_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NganhNgheNhaTuyenDung" ADD CONSTRAINT "NganhNgheNTD_Nganh_id" FOREIGN KEY ("nganh_nghe_id") REFERENCES "NganhNghe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhucLoiNhaTuyenDung" ADD CONSTRAINT "PhucLoiNTD_NTD_id" FOREIGN KEY ("nha_tuyen_dung_id") REFERENCES "NhaTuyenDung"("nha_tuyen_dung_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhucLoiNhaTuyenDung" ADD CONSTRAINT "PhucLoiNTD_PhucLoi_id" FOREIGN KEY ("phuc_loi_id") REFERENCES "PhucLoi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
