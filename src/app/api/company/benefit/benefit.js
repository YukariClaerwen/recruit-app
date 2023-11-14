import { db } from "@/lib/db";
import { cache } from "react";

export const revalidate = 3600 // revalidate the data at most every hour

export const getBenefits = (cache(async () => {
    try{
        const benefits = await db.phucLoi.findMany({
            where: {is_deleted: false},
            select: {
                id: true,
                ten_phuc_loi: true,
                icon: true,
            }
        })

        const result = benefits;
        return({data: result, status: 200});

    } catch(err) {
        return ({message: err.message, status: 500})
    }
}))

export const addBenefit = (cache(async(req) => {
    try{
        const { benefit_name, icon } = req
        const benefit = await db.phucLoi.create({
            data: {
                ten_phuc_loi: benefit_name,
                icon: icon
            }
        })

        const result = benefit;
        return({data: result, status: 200});

    } catch(err) {
        return ({message: err.message, status: 500})
    }
}))

export const updateBenefit = (cache(async(req) => {
    try{
        const { benefit_id, benefit_name, icon } = req
        const benefit = await db.phucLoi.update({
            where: { id: benefit_id },
            data: {
                ten_phuc_loi: benefit_name,
                icon: icon
            }
        })

        const result = benefit;
        return({data: result, status: 200});

    } catch(err) {
        return ({message: err.message, status: 500})
    }
}))

export const deleteBenefit = (cache(async(req) => {
    try{
        const { benefit_id } = req
        const benefit = await db.phucLoi.update({
            where: { id: benefit_id },
            data: {
                is_deleted: true,
            }
        })

        const result = benefit;
        return({data: result, status: 200});

    } catch(err) {
        return ({message: err.message, status: 500})
    }
}))