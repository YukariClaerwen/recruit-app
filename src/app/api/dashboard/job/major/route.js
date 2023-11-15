import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getMajor } from "../major";

export async function POST(req) {
    try {
        const body = await req.json();
        const { frmInput, frmGroup } = body

        let existingGroup, existingMajor
        if (frmGroup === "new") {
            existingGroup = await db.nhomNganh.findUnique({
                where: { ten_nhom: frmInput }
            })
            if (existingGroup) {
                return NextResponse.json({ group: null, message: `Nhóm <b>${frmInput}</b> đã tồn tại, hãy nhập tên khác` }, { status: 409 })
            }
            const newGroup = await db.nhomNganh.create({
                data: {
                    ten_nhom: frmInput,
                }
            })
            return NextResponse.json({ group: newGroup, message: `Nhóm <b>${frmInput}</b> đã được tạo!` }, { status: 201 })
        } else {
            existingMajor = await db.nganhNghe.findUnique({
                where: { ten_nganh: frmInput }
            })

            if (existingMajor) {
                return NextResponse.json({ major: null, message: `Ngành <b>${frmInput}</b> đã tồn tại, hãy nhập tên khác` }, { status: 409 })
            }
            const newMajor = await db.nganhNghe.create({
                data: {
                    ten_nganh: frmInput,
                    nhom_nganh_id: parseInt(frmGroup),
                }
            })
            return NextResponse.json({ major: newMajor, message: `Ngành <b>${frmInput}</b> đã được tạo!` }, { status: 201 })
        }

    } catch (err) {
        throw new Error(err);
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { frmInput, original, action } = body

        if(action === "editMajor") {
            const existingMajor = await db.nganhNghe.findUnique({
                where: { ten_nganh: frmInput}
            })
    
            if (existingMajor) {
                return NextResponse.json({ major: null, message: `Ngành ${frmInput} đã tồn tại, hãy nhập tên khác` }, { status: 409 })
            }
            const oldMajor = await db.NganhNghe.findFirst({
                where: {id: parseInt(original)}
            })
            const editedMajor = await db.nganhNghe.update({
                where: { id: parseInt(original) },
                data: {
                    ten_nganh: frmInput,
                }
            })
    
            return NextResponse.json({ major: editedMajor, message: `Đã sửa tên ngành <b>${oldMajor.ten_nganh}</b> thành <b>${editedMajor.ten_nganh}</b>` }, { status: 201 })
        } else {

            const major = await db.nganhNghe.update({
                where: { id: parseInt(original)},
                data: { is_deleted: true},
            })
            return NextResponse.json({ major: major, message: `Đã xóa ngành <b>${frmInput}</b>` }, { status: 201 })
        }

        
        
    } catch (err) {
        throw new Error(err);
    }
}

export async function GET(req) {
    try {
        const result = await getMajor();

        return NextResponse.json({ majors: result }, { status: 201 })

    } catch (err) {
        throw new Error(err);
    }
}