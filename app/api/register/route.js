import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";


export const POST = async (req) => {
    const { name, email, password } = await req.json();

    const client = await MongoClient.connect(process.env.MONGO_URL);
    const usersCollection = client.db('HenryWallen').collection('users');
    const user = await usersCollection.findOne({ email });

    if (user) {
        return new NextResponse('user is already exist', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await usersCollection.insertOne({
            name: name,
            email: email,
            password: hashedPassword,
            image: '',
        });
        client.close();
        return new NextResponse('ok', { status: 200 });
    } catch (er) {
        return new NextResponse(er, { status: 500 });
    }
    
}