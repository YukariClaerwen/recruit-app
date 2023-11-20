

import { NextResponse } from "next/server";
import { applyJob } from "./apply";

export const revalidate = 3600 

export async function POST(req) {
    try {
        const body = await req.json();
        
        const result = await applyJob(body);

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