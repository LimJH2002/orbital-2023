import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        // Google
        GoogleProvider({
            clienId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
})