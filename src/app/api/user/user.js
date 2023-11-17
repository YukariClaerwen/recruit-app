
import { db } from "@/lib/db";
import { cache } from "react";
export const revalidate = 3600 // revalidate the data at most every hour

export const getUser = cache(async () => {
    try {
        const users = await db.taiKhoan.findMany({
            select: {
                id: true,
                email: true,
                ten_tai_khoan: true,
                name: true,
                image: true,
                created_at: true,
                updated_at: true,
                ung_vien: {
                    select: {
                        ung_vien_id: true,
                    },
                    where: { is_deleted: false },
                },
                quan_tri: {
                    select: {
                        quan_tri_id: true,
                    },
                    where: { is_deleted: false },
                },
                tu_van_vien: {
                    select: {
                        tu_van_vien_id: true,
                    },
                    where: { is_deleted: false },
                },
                nha_tuyen_dung: {
                    select: {
                        nha_tuyen_dung_id: true,
                    },
                    where: { is_deleted: false },
                },
                Account: {
                    select: {
                        provider: true,
                    },
                }

            }
        });

        const candidates = await users.filter(user => {
            if (user.ung_vien !== null) return user
        })
        const recruiters = await users.filter(user => {
            if (user.nha_tuyen_dung !== null) return user
        })
        const consultants = await users.filter(user => {
            if (user.tu_van_vien !== null) return user
        })
        const admins = await users.filter(user => {
            if (user.quan_tri !== null) return user
        })

        const data = await users.map(user => {
            return ({
                id: user.id,
                email: user.email,
                username: user.ten_tai_khoan,
                name: user.name,
                image: user.image,
                created_at: user.created_at,
                role: user.quan_tri != null ? 'admin'
                    : user.tu_van_vien != null ? 'consultant'
                        : user.nha_tuyen_dung != null ? 'recruiter'
                            : 'user',
                Account: user.Account,
            })
        })
        // console.log(users)

        const result = {
            count: users.length,
            users: data,
            tag: {
                candidates, recruiters, consultants, admins
            }
        }

        return result

    } catch (err) {
        return ({ message: err, status: 500 });
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
                        image: true,
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
        const data = c.filter(user => {
            if (user.ung_vien !== null) return user
        })
        return data

    } catch (err) {
        return ({ message: "Something went wrong" }, { status: 500 });
    }
})

export const updateRole = cache(async (req) => {
    try {
        const { selectField, id, _email } = await req

        const _id = parseInt(id);

        const checkRole = await db.taiKhoan.findUnique({
            where: {
                email: _email,
            },
            select: {
                quan_tri: {
                    where: { is_deleted: false },
                }
            }
        })
        if (!checkRole.quan_tri) {
            return ({ message: "Bạn không được phép sử dụng chức năng này", status: 404 })
        } else {
            const user = await db.taiKhoan.findUnique({
                where: { id: _id },
                select: {
                    id: true,
                    ung_vien: {
                        select: {
                            ung_vien_id: true,
                            is_deleted: true,
                        }
                    },
                    quan_tri: {
                        select: {
                            quan_tri_id: true,
                            is_deleted: true,
                        }
                    },
                    tu_van_vien: {
                        select: {
                            tu_van_vien_id: true,
                            is_deleted: true,
                        }
                    },
                    nha_tuyen_dung: {
                        select: {
                            nha_tuyen_dung_id: true,
                            is_deleted: true,
                        }
                    },
                }
            })

            const oldRole = (user.quan_tri != null && user.quan_tri.is_deleted === false) ? 'admin'
                : (user.tu_van_vien != null && user.tu_van_vien.is_deleted === false) ? 'consultant'
                    : (user.nha_tuyen_dung != null && user.nha_tuyen_dung.is_deleted === false) ? 'recruiter'
                        : 'user'
          
            const query = {
                where: { tai_khoan_id: _id },
                update: { is_deleted: false },
                create: { tai_khoan_id: _id }
            }

            if (await selectField.value == 'admin') {
               await db.quanTri.upsert(query)
            } else if (selectField.value === 'consultant') {
                await db.tuVanVien.upsert(query)
            } else if (selectField.value === 'recruiter') {
                await db.nhaTuyenDung.upsert(query)
            } else {
                await db.ungVien.upsert(query)
            }

            const _updatequery = {
                where: { tai_khoan_id: _id },
                data: { is_deleted: true },
            }
            if (oldRole === 'admin') {
                await db.quanTri.update(_updatequery)
            } else if (oldRole === 'consultant') {
                await db.tuVanVien.update(_updatequery)
            } else if (oldRole === 'recruiter') {
                await db.nhaTuyenDung.update(_updatequery)
            } else {
                await db.ungVien.update(_updatequery)
            }

            const updated = await db.taiKhoan.findUnique({
                where: { id: _id },
                select: {
                    id: true,
                    ung_vien: {
                        select: {
                            ung_vien_id: true,
                            is_deleted: true,
                        }
                    },
                    quan_tri: {
                        select: {
                            quan_tri_id: true,
                            is_deleted: true,
                        }
                    },
                    tu_van_vien: {
                        select: {
                            tu_van_vien_id: true,
                            is_deleted: true,
                        }
                    },
                    nha_tuyen_dung: {
                        select: {
                            nha_tuyen_dung_id: true,
                            is_deleted: true,
                        }
                    },
                }
            })


            return ({ data: await updated, message: "Cập nhật thành công!", status: 200 })
        }

    } catch (e) {
        return ({ message: e.message, status: 500 });
    }
})