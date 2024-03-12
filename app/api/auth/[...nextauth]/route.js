
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

const handler = NextAuth({
    pages:{
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                try {
                    const client = await MongoClient.connect(process.env.MONGO_URL);
                    const usersCollection = client.db('HenryWallen').collection('users');
                    const user = await usersCollection.findOne({ email: credentials.email });

                    client.close();

                    if (user) {
                        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                        if (!passwordMatch) {
                            return null;
                        }


                        return { email: user.email};
                    }
                } catch (e){
                    console.log("ERR--or!", e);
                }
                
                return null;
            }
        }),
    ]
});

export {handler as POST, handler as GET}

