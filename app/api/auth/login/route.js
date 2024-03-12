import { NextResponse } from "next/server";

export default async function POST(request) {
    try {
        const { email, password } = await request.json();
        console.log({ email, password });
    }catch (e){
        console.log({ e });
    }

    return NextResponse.json({ message: 'success!' });
}