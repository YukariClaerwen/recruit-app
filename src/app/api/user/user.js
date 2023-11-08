"use server";
import { db } from "@/lib/db";
import { cache } from "react";

export const getUser = cache(async () => {
    try {
        const users = await db.taiKhoan.findMany({
            select: {
                id: true,
                email: true,
                ten_tai_khoan: true,
                avatar: true,
                created_at: true,
                updated_at: true,
                ung_vien: {
                    select: {
                        ung_vien_id: true,
                    }
                },
                quan_tri: {
                    select: {
                        quan_tri_id: true,
                    }
                },
                tu_van_vien: {
                    select: {
                        tu_van_vien_id: true,
                    }
                },
                nha_tuyen_dung: {
                    select: {
                        nha_tuyen_dung_id: true,
                    }
                },
                
            }
        });
        
        const candidates = await users.filter(user =>{
            if(user.ung_vien !== null) return user
        })
        const recruiters = await users.filter(user =>{
            if(user.nha_tuyen_dung !== null) return user
        })
        const consultants = await users.filter(user =>{
            if(user.tu_van_vien !== null) return user
        })
        const admins = await users.filter(user =>{
            if(user.quan_tri !== null) return user
        })

        const d = {
            count: users.length,
            users: users,
            tag: {
                candidates, recruiters, consultants, admins
            }
        }

        return d

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
})
export const getCandidates = cache(async () => {
    try {
        const users = await db.ungVien.findMany({
            select: {
                tai_khoan_id: true,
                ung_vien_id: true,
                tai_khoan: {
                    select: {
                        email: true,
                        ten_tai_khoan: true,
                        avatar: true,
                        created_at: true,
                        updated_at: true,
                    }
                }
            }
        });
        return users

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
})

export const countUsers = cache(async () => {
    try {
        const c = await db.taiKhoan.findMany({
            include: { 
                ung_vien: true
            },
        });
        const data = c.filter(user =>{
            if(user.ung_vien !== null) return user
        })
        return data

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
})