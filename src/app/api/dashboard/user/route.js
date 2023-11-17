
import { NextResponse } from "next/server";
import { updateRole } from "../../user/user";

export async function PUT(req) {
    try {
        const body = await req.json();
        
        const result = await updateRole(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        if (result.status === 404) {
            return NextResponse.json({ message: result.message}, { status: 404 })
        }
        return NextResponse.json({ message: result.message }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}