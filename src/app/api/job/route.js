import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { saveJob } from "./follow";

export async function POST(req) {
    try {
        const body = await req.json();
        
        const result = await saveJob(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        if (result.status === 404) {
            return NextResponse.json({ message: result.message}, { status: 404 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        return NextResponse.json({ data: result.data, message: result.message }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}

// const selectJobList = {
//     id: true,
//     chuc_danh: true,
//     luong_toi_thieu: true,
//     luong_toi_da: true,
//     luong_thuong_luong: true,
//     luong_loai_tien: true,
//     luot_xem: true,
//     created_at: true,
//     nha_tuyen_dung: {
//         select: {
//             ten_cong_ty: true,
//             logo: true
//         }
//     },
//     ds_dia_diem: {
//         select: {
//             tinh_thanh: {
//                 select: { ten_tinh_thanh: true }
//             }
//         }
//     },
//     ds_tu_khoa: {
//         select: {
//             tu_khoa: {
//                 select: {
//                     ten_tu_khoa: true,
//                 }
//             }
//         }
//     }
// }
// const returnJobsItem = (jobs) => {
//     const defaultValues = (item) => {
//         return {
//             id: item.id,
//             title: item.chuc_danh,
//             views: item.luot_xem,
//             posted_at: item.created_at,
//             company: {
//                 name: item.nha_tuyen_dung.ten_cong_ty,
//                 logo: item.nha_tuyen_dung.logo,
//             },
//             locations: item.ds_dia_diem.map(loc => {
//                 return loc['tinh_thanh']['ten_tinh_thanh']
//             }),
//             tags: item.ds_tu_khoa.map(tag => {
//                 return tag['tu_khoa']['ten_tu_khoa']
//             })
//         }
//     }
//     const data = jobs.map(item => {
//         if (item.luong_thuong_luong) {
//             return {
//                 ...defaultValues(item),
//                 salary: false
//             }
//         }
//         return {
//             ...defaultValues(item),
//             salary: {
//                 min: item.luong_toi_thieu.toFixed(0).toString(),
//                 max: item.luong_toi_da.toFixed(0).toString(),
//                 currency: item.luong_loai_tien,
//             },
//         }
//     })

//     return data
// }

// const sortByDefault = {
//     updated_at: 'desc',
// }
// const sortAsc = { updated_at: 'asc', }
// const sortSalary = async (jobs) => {
//     const rate = { usd: 1, vnd: 24000 }
//     await jobs.sort((a, b) => {
//         const aExchange = (a.luong_loai_tien == 2 ? a.luong_toi_da * rate.vnd : a.luong_toi_da);
//         const bExchange = (b.luong_loai_tien == 2 ? b.luong_toi_da * rate.vnd : b.luong_toi_da);
//         return (aExchange - bExchange);
//     }).sort((a, b) => {
//         const aExchange = (a.luong_loai_tien == 2 ? a.luong_toi_thieu * rate.vnd : a.luong_toi_thieu);
//         const bExchange = (b.luong_loai_tien == 2 ? b.luong_toi_thieu * rate.vnd : b.luong_toi_thieu);
//         return (aExchange - bExchange);
//     }).sort((a, b) => {
//         return (a.luong_thuong_luong === b.luong_thuong_luong) ? 0 : b ? -1 : 1
//     }).reverse()
// }


// export async function GET(request) {
//     const page = 1;
//     const sort = "desc";
//     const tag = 64
//     const sortBy = sort == "asc" ? sortAsc
//                  : sort == "desc" ? sortByDefault
//                  : sortByDefault
//     const where = {
//         ds_tu_khoa: {
//             some: {
//                 tu_khoa_id: tag
//             }
//         }
//     }



//     try {
//         let take = 10;
//         let skip = (page - 1) * take;

//         const [jobs, count] = await db.$transaction([
//             db.viecLam.findMany({
//                 skip: skip,
//                 take: take,
//                 where: where,
//                 select: selectJobList,
//                 orderBy: sortBy
//             }),
//             db.viecLam.count()
//         ])

//         console.log(await jobs)

//         if (sort == 'salary') { sortSalary(await jobs) }

//         const data = returnJobsItem(await jobs)

    
//         const result = {
//             data: data,
//             pagination: {
//                 total: count
//             }
//         }

//         return NextResponse.json({ result }, { status: 201 });
        


//     } catch (err) {
//         return ({ message: err, status: 500 });
//     }
// }