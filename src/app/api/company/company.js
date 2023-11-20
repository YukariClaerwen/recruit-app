import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { cache } from "react";
import { getJobsByCompany } from "../job/job";

export const revalidate = 3600 // revalidate the data at most every hour

export const getCompanies = cache(async () => {
    try {

        const companies = await db.nhaTuyenDung.findMany({
            where: { is_deleted: false },
            select: {
                nha_tuyen_dung_id: true,
                ten_cong_ty: true,
                linh_vuc: true,
                logo: true,
                images: true,
                cover: true,
                _count: {
                    select: {
                        ds_tin_tuyen_dung: true
                    }
                }
            },
            orderBy: {
                ds_tin_tuyen_dung: {
                    _count: 'desc',
                },
            }
            // include: {
            //     quy_mo: true,
            //     linh_vuc: true,
            //     tu_van_vien: {
            //         select: {
            //             ho_ten: true,
            //             so_dien_thoai: true,
            //             tai_khoan: {
            //                 select: {
            //                     email: true,
            //                 }
            //             }
            //         }
            //     },
            // ds_dia_diem: true
            // }
        });

        const result = companies.map(c => {
            return {
                id: c.nha_tuyen_dung_id,
                company_name: c.ten_cong_ty,
                ...(c.linh_vuc == null ? { industry: false } : {
                    industry: c.linh_vuc.ten_linh_vuc,
                }),
                logo: c.logo,
                cover: c.cover,
                images: c.images,
                jobs_count: c._count.ds_tin_tuyen_dung,
            }
        })

        // const result = companies.map((c) => {
        //     return {
        //         id: c.nha_tuyen_dung_id,
        //         company_name: c.ten_cong_ty,
        //         address: c.dia_chi,
        //         ...(c.quy_mo == null ? {company_size: false} : {
        //             company_size: c.quy_mo.quy_mo,
        //         }),
        //         nation: c.quoc_gia,
        //         contact_person: c.nguoi_lien_he,
        //         ...(c.linh_vuc == null ? {industry: false} : {
        //             industry: c.linh_vuc.ten_linh_vuc,
        //         }),
        //         description: c.mo_ta,
        //         phone_number: c.so_dien_thoai,
        //         logo: c.logo,
        //         ...(c.ds_dia_diem == null) ? {location: false} : {
        //             location: c.ds_dia_diem.map(l => {
        //                 return {
        //                     ...(!l.is_branch ? {
        //                         head: l.tinh_thanh.ten_tinh_thanh
        //                     } : {
        //                         branch: l.branch_name,
        //                         province: l.tinh_thanh.ten_tinh_thanh
        //                     })
        //                 } 
        //             }),
        //         },
        //         ...(c.tinh_thanh == null ? {location: false} : {
        //             location: c.tinh_thanh.ten_tinh_thanh,
        //         }),
        //         ...(c.tu_van_vien == null ? {consultant: false} : {
        //             consultant: {
        //                 name: c.tu_van_vien.ho_ten,
        //                 phone_number: c.tu_van_vien.so_dien_thoai,
        //                 email: c.tu_van_vien.tai_khoan.email          
        //             }
        //         })
        //     }
        // })

        return ({ data: result, status: 200 });

    } catch (err) {
        return ({ message: err.message, status: 500 });
    }
})

export const getCompany = cache(async (id) => {
    try {

        const company = await db.nhaTuyenDung.findUnique({
            where: { nha_tuyen_dung_id: parseInt(id) },
            include: {
                quy_mo: true,
                linh_vuc: true,
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
                },
                ds_dia_diem: {
                    select: {
                        tinh_thanh: true,
                        branch_name: true,
                        dia_chi: true,
                    }
                },
                ds_phuc_loi: {
                    select: {
                        phuc_loi: true,
                        mo_ta: true,
                    }
                }
            }
        });

        const jobs = await getJobsByCompany(parseInt(id))

        // console.log(jobs)

        const result = {
            id: company.nha_tuyen_dung_id,
            company_name: company.ten_cong_ty,
            address: company.dia_chi,
            ...(company.quy_mo == null ? { company_size: false } : {
                company_size: company.quy_mo.quy_mo,
            }),
            nation: company.quoc_gia,
            contact_person: company.nguoi_lien_he,
            ...(company.linh_vuc == null ? { industry: false } : {
                industry: company.linh_vuc.ten_linh_vuc,
            }),
            description: company.mo_ta,
            phone_number: company.so_dien_thoai,
            logo: company.logo,
            cover: company.cover,
            location: company.ds_dia_diem.map(l => {
                return {
                    name: l.branch_name,
                    province: l.tinh_thanh.ten_tinh_thanh,
                    address: l.dia_chi
                }
            }),
            // benefits: company.ds_phuc_loi,
            benefits: company.ds_phuc_loi.map(b => {
                return {
                    name: b.phuc_loi.ten_phuc_loi,
                    description: b.mo_ta,
                    icon: b.phuc_loi.icon,
                }
            }),
            ...(company.tu_van_vien == null ? { consultant: false } : {
                consultant: {
                    name: company.tu_van_vien.ho_ten,
                    phone_number: company.tu_van_vien.so_dien_thoai,
                    email: company.tu_van_vien.tai_khoan.email
                }
            }),
            jobs: jobs
        }

        return ({ data: result, status: 200 });

    } catch (err) {
        console.log(err.message)
        return ({ message: err.message, status: 500 });
    }
})

export const addCompany = cache(async (req) => {
    try {

        const
            {
                value:
                {
                    email, password, cPassword,
                    company_name, company_size,
                    industry, nation, contact_person,
                    phone_number, description, locations, benefits, 
                    logo,cover,
                    // logo, images
                }
            } = req


        // check if email already exists
        const existingUserByEmail = await db.taiKhoan.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return ({ user: null, message: `Email ${email} đã tồn tại, hãy đăng nhập hoặc tạo email khác`, status: 409 })
        }


        const hashedPassword = await hash(password, 10);

        const _locations = locations.map(loc => {
            return {
                tinh_thanh_id: loc.province.value,
                branch_name: loc.name,
                dia_chi: loc.address,
                is_branch: loc.is_branch,
            }
        })

        const _benefits = benefits.map(b => {
            return {
                phuc_loi_id: b.benefit.value,
                mo_ta: b.description
            }
        })

        const recruiter = await db.taiKhoan.create({
            data: {
                email: email,
                mat_khau: hashedPassword,
                nha_tuyen_dung: {
                    create: {
                        ten_cong_ty: company_name,
                        quy_mo_id: company_size.value,
                        quoc_gia: nation,
                        nguoi_lien_he: contact_person,
                        linh_vuc_id: industry.value,
                        mo_ta: description,
                        so_dien_thoai: phone_number,
                        ds_dia_diem: {
                            createMany: { data: _locations }
                        },
                        ds_phuc_loi: {
                            createMany: { data: _benefits },
                        },
                        logo: logo,
                        cover: cover,
                    }
                }
            }
        });

        const { mat_khau, ...rest } = recruiter

        return ({ data: rest, message: "Tạo thêm nhà tuyển dụng thành công.", status: 201 });

    } catch (err) {
        console.log(err)
        return ({ message: err.message, status: 500 })
    }
})

export const updateCompany = cache(async (req) => {
    try {
        const {
            value: {
                company_id,
                // email, password, cPassword,
                company_name, company_size,
                industry, nation, contact_person,
                phone_number, description, locations, benefits, 
                logo,cover,
            }
        } = req

        const update_data = {
            ten_cong_ty: company_name,
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