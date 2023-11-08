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
CREATE TABLE "QuanTri" (
    "tai_khoan_id" INTEGER NOT NULL,
    "quan_tri_id" SERIAL NOT NULL,
    "ho_ten" VARCHAR(256) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuanTri_pkey" PRIMARY KEY ("tai_khoan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_email_key" ON "TaiKhoan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_ten_tai_khoan_key" ON "TaiKhoan"("ten_tai_khoan");

-- CreateIndex
CREATE INDEX "TaiKhoan_created_at_idx" ON "TaiKhoan"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "QuanTri_quan_tri_id_key" ON "QuanTri"("quan_tri_id");

-- CreateIndex
CREATE INDEX "QuanTri_created_at_idx" ON "QuanTri"("created_at");

-- AddForeignKey
ALTER TABLE "QuanTri" ADD CONSTRAINT "QT_TaiKhoan_id" FOREIGN KEY ("tai_khoan_id") REFERENCES "TaiKhoan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
