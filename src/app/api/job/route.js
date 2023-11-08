import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
    try {
        const formData = await request.formData();
        const data = {
            key: formData.get('frmSearchKey'),
            location: formData.get('frmSearchLocation')
        }

        const result = await db.viecLam.findMany({ 
            where: {
                 mo_ta : {search: data.key}
            }
        })

        return NextResponse.json({ result }, { status: 201 });
    } catch (err) {
        throw new Error(err);
        // return NextResponse.json( { message: "Something went wrong"}, { status: 500 });
    }
}