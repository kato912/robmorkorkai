import Google from "@auth/express/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "../utils/prisma.js";

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

            profile(profile){
                const isKKU = profile.email?.endsWith("@kkumail.com") || false;

                const defaultName = profile.name || profile.email?.split("@")[0];

                return{
                    id: profile.sub,
                    name: defaultName,
                    email: profile.email,
                    image: profile.picture,
                    isVerifiedStudent: isKKU,
                    role: "USER",
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            // เอา ID และ Role จาก Database (user) ยัดกลับเข้าไปใน Session
            if (session.user) {
                session.user.id = user.id;
                session.user.role = user.role; 
                session.user.isVerifiedStudent = user.isVerifiedStudent;
            }
            return session;
        }
    },
    events:{
        async signIn({user}: {user: any}){
            if(user.id){
                await prisma.user.update({
                    where: {id: user.id},
                    data: {lastLoginAt: new Date()},
                });
                console.log(`User ${user.email} logged in at ${new Date()}`);
            }
        },
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
};