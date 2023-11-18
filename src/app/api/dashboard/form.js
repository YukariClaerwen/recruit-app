
'use server'
import { db } from "@/lib/db";

export const getLevel = async() => {
    try {
        const levels = await db.capBac.findMany({
            select: {
                id: true,
                ten_cap_bac: true
            }
        });
        const data = await levels.map(item => {
            return {
                value: item.id,
                label: item.ten_cap_bac
            }
        })
        return data

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
}

export const getIndustry = async() => {
    try {
        const industries = await db.linhVuc.findMany({
            select: {
                id: true,
                ten_linh_vuc: true
            }
        });
        const data = await industries.map(item => {
            return {
                value: item.id,
                label: item.ten_linh_vuc
            }
        })
        return data

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
}

export const getCompanySize = async () => {
    try {
        const size = await db.quyMo.findMany({
            select: {
                id: true,
                quy_mo: true
            }
        })
        const data = await size.map(item => {
            return {
                value: item.id,
                label: item.quy_mo
            }
        })
        return data
    } catch(err) {
        return ({ message: err.message, status: 500 });
    }
}

export const getBenefit = async () => {
    try {
        const benefits = await db.phucLoi.findMany({
            select: {
                id: true,
                ten_phuc_loi: true,
                icon: true
            }
        })
        const data = await benefits.map(item => {
            return {
                value: item.id,
                label: item.ten_phuc_loi,
                icon: item.icon
            }
        })
        return data
    } catch(err) {
        return ({ message: err.message, status: 500 });
    }
}

export const getLocation = async () => {
    try {
        const locations = await db.tinhThanh.findMany({
            select: {
                id: true,
                ten_tinh_thanh: true
            }
        });
        const data = await locations.map(item => {
            return {
                value: item.id,
                label: item.ten_tinh_thanh
            }
        })
        return data

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
}

export const getMajor = async () => {
    try {
        const majors = await db.nganhNghe.findMany({
            where: { is_deleted: false },
            select: {
                id: true,
                ten_nganh: true,
            }
        })
        const data = await majors.map(item => {
            return {
                value: item.id,
                label: item.ten_nganh
            }
        })
        return data;

    } catch (e) {
        return ({ status: 500, message: e });
    }
}

export const getTag = async () => {
    try {
        const tags = await db.tuKhoa.findMany({
            select: {
                id: true,
                ten_tu_khoa: true,
            }
        })
        const data = await tags.map(item => {
            return {
                value: item.id,
                label: item.ten_tu_khoa
            }
        })
        return data;
    } catch (e) {
        return ({ status: 500, message: e });
    }
}
export const getLanguage = async () => {
    try {
        const tags = await db.ngonNgu.findMany({
            select: {
                id: true,
                ten_ngon_ngu: true,
            }
        })
        const data = await tags.map(item => {
            return {
                value: item.id,
                label: item.ten_ngon_ngu
            }
        })
        return data;
    } catch (e) {
        return ({ status: 500, message: e });
    }
}

export const getCompany = async() => {
    try {
        const companies = await db.nhaTuyenDung.findMany({
            select: {
                nha_tuyen_dung_id: true,
                ten_cong_ty: true,
            }
        })
        const data = await companies.map(item => {
            return {
                value: item.nha_tuyen_dung_id,
                label: item.ten_cong_ty
            }
        })
        return data;
    } catch (e) {
        return ({ status: 500, message: e });
    }
}