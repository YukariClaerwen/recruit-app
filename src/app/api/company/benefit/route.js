import { NextResponse } from "next/server";
import { addBenefit, getBenefits, updateBenefit } from "./benefit";

export async function GET() {
    try {
        
        const result = await getBenefits();

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        
        return NextResponse.json({ benefits: result.data }, { status: 200 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        
        const result = await addBenefit(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        return NextResponse.json({ benefit: result.data }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        
        const result = await updateBenefit(body);

        if (result.status === 500) {
            return NextResponse.json({ message: result.message}, { status: 500 })
        }
        if (result.status === 409) {
            return NextResponse.json({ message: result.message}, { status: 409 })
        }
        return NextResponse.json({ benefit: result.data }, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something is wrong!"}, { status: 500 })
    }
}