import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { cache } from "react";

export const revalidate = 3600 // revalidate the data at most every hour

export const getCompanies = cache(async () => {
    try {

        const companies = await db.nhaTuyenDung.findMany({
            where: { is_deleted: false },
            include: {
                quy_mo: true,
                linh_vuc: true,
                tinh_thanh: true,
                tu_van_vien: {
                    select: {
                        ho_ten: true,
                        so_dien_thoai: true,
                        tai_khoan: {
                            select: {
                                email: true,
                            }
                        }
                    }
                }
            }
        });

        const result = companies.map((c) => {
            return {
                id: c.nha_tuyen_dung_id,
                company_name: c.ten_cong_ty,
                address: c.dia_chi,
                ...(c.quy_mo == null ? {company_size: false} : {
                    company_size: c.quy_mo.quy_mo,
                }),
                nation: c.quoc_gia,
                contact_person: c.nguoi_lien_he,
                ...(c.linh_vuc == null ? {industry: false} : {
                    industry: c.linh_vuc.ten_linh_vuc,
                }),
                description: c.mo_ta,
                phone_number: c.so_dien_thoai,
                logo: c.logo,
                ...(c.tinh_thanh == null ? {location: false} : {
                    location: c.tinh_thanh.ten_tinh_thanh,
                }),
                ...(c.tu_van_vien == null ? {consultant: false} : {
                    consultant: {
                        name: c.tu_van_vien.ho_ten,
                        phone_number: c.tu_van_vien.so_dien_thoai,
                        email: c.tu_van_vien.tai_khoan.email          
                    }
                })
            }
        })

        return ({ data: result, status: 200 });

    } catch (err) {
        return ({ message: err.message, status: 500 });
    }
})

export const addCompany = cache(async (req) => {
    try {

        const {
            email, username, password,
            company_name, address, size,
            nation, contact_person, industry,
            description, logo, location,
            benefits, phone,
        } = req

        // check if email already exists
        const existingUserByEmail = await db.taiKhoan.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return ({ user: null, message: `Email ${email} đã tồn tại, hãy đăng nhập hoặc tạo email khác`, status: 409 })
        }

        // check if username already exists
        const existingUserByUsername = await db.taiKhoan.findUnique({
            where: { ten_tai_khoan: username }
        });
        if (existingUserByUsername) {
            return ({ user: null, message: `Tên tài khoản ${username} đã tồn tại, hãy nhập một tên khác`, status: 409 })
        }

        const hashedPassword = await hash(password, 10);

        const recruiter = await db.taiKhoan.create({
            data: {
                email: email,
                ten_tai_khoan: username,
                mat_khau: hashedPassword,
                nha_tuyen_dung: {
                    create: {
                        ten_cong_ty: company_name,
                        dia_chi: address,
                        quy_mo_id: size,
                        quoc_gia: nation,
                        nguoi_lien_he: contact_person,
                        linh_vuc_id: industry,
                        mo_ta: description,
                        logo: logo,
                        tinh_thanh_id: location,
                        so_dien_thoai: phone,
                        ds_phuc_loi: {
                            createMany: { data: benefits },
                        }
                    }
                }
            }
        });

        const {mat_khau, ...rest} = recruiter

        return ({ data: rest, status: 201 });

    } catch (err) {
        console.log(err)
        return ({ message: err.message, status: 500 })
    }
})

export const updateCompany = cache(async (req) => {
    try {
        const { company_id,
            company_name, address, size,
            nation, contact_person, industry,
            description, logo, location,
            benefits, phone,
        } = req;

        const update_data = {
            ten_cong_ty: company_name,
            dia_chi: address,
            quy_mo_id: size,
            quoc_gia: nation,
            nguoi_lien_he: contact_person,
            linh_vuc_id: industry,
            mo_ta: description,
            logo: logo,
            tinh_thanh_id: location,
            so_dien_thoai: phone
        }

        const delete_benefits = await db.phucLoiNhaTuyenDung.deleteMany({
            where: {
                nha_tuyen_dung_id: company_id
            }
        })
        const company = await db.nhaTuyenDung.update({
            where: { nha_tuyen_dung_id: company_id },
            data: {
                ...update_data,
                ds_phuc_loi: {
                    createMany: { data: benefits },
                }
            },
            include: {
                ds_phuc_loi: true,
            }
        })

        const result = company;
        return ({ data: result, status: 201 });

    } catch (err) {
        return ({ message: err.message, status: 500 })
    }

})

export const deleteCompany = cache(async (req) => {
    try {

        const { company_id } = req;

        const delete_company = await db.nhaTuyenDung.update({
            where: { nha_tuyen_dung_id: company_id },
            data: {
                is_deleted: true,
            },
            select: { nha_tuyen_dung_id: true }
        })
        const result = delete_company;
        return ({ data: result, status: 201 });

    } catch (err) {
        return ({ message: err.message, status: 500 })
    }
})