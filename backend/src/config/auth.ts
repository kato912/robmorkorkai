import Google from "@auth/express/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "../utils/prisma";

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

    trustHost: true,
};