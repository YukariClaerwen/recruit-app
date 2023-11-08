import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const jobs = await db.viecLam.findMany({
            select: {
                id: true,
                chuc_danh: true,
                luong_toi_thieu: true,
                luong_toi_da: true,
                luong_thuong_luong: true,
                luot_xem: true,
                created_at: true,
                nha_tuyen_dung: {
                    select: {
                        ten_cong_ty: true,
                        logo: true
                    }
                },
                ds_tu_khoa: {
                    select: {
                        tu_khoa: {
                            select: {
                                id: true,
                                ten_tu_khoa: true,
                            }
                        }
                    }
                }
            }
        })
        const data = await jobs.map(item => {
            if(item.luong_thuong_luong) {
                return {
                    id: item.id,
                    title: item.chuc_danh,
                    views: item.luot_xem,
                    posted_at: item.created_at,
                    company: {
                        name: item.nha_tuyen_dung.ten_cong_ty,
                        logo: item.nha_tuyen_dung.logo,
                    },
                    tags: item.ds_tu_khoa.map(tag => {
                        return tag['tu_khoa']['ten_tu_khoa']
                    })
                }
            }
            return {
                id: item.id,
                title: item.chuc_danh,
                salaryMin: item.luong_toi_thieu,
                salaryMax: item.luong_toi_da,
                views: item.luot_xem,
                posted_at: item.created_at,
                company: {
                    name: item.nha_tuyen_dung.ten_cong_ty,
                    logo: item.nha_tuyen_dung.logo,
                },
                tags: item.ds_tu_khoa.map(tag => {
                    return tag['tu_khoa']['ten_tu_khoa']
                })
            }
        })

        return NextResponse.json({ data }, { status: 201 });
    } catch (err) {
        throw new Error(err);
        // return NextResponse.json( { message: "Something went wrong"}, { status: 500 });
    }
}