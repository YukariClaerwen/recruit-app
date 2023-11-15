// import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { addCompany, getCompanies, updateCompany } from "./company";

export async function GET() {
    try {
        
        const result = await getCompanies();

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        
        return NextResponse.json({ companies: result.data }, { status: 200 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        
        const result = await addCompany(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        return NextResponse.json({ companies: result.data }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        
        const result = await updateCompany(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        return NextResponse.json({ company: result.data }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}