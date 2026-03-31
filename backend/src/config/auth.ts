import Google from "@auth/express/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "../utils/prisma.js";

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,

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

    useSecureCookies: true,
    cookies: {
        csrfToken: {
            name: '__Secure-authjs.csrf-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        pkceCodeVerifier: {
            name: '__Secure-authjs.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        state: {
            name: '__Secure-authjs.state',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        callbackUrl: {
            name: '__Secure-authjs.callback-url',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        sessionToken: {
             name: '__Secure-authjs.session-token',
             options: {
                  httpOnly: true,
                  sameSite: 'lax',
                  path: '/',
                  secure: true
             }
        }
    },

    callbacks: {
        async session({ session, user }: { session: any; user: any }) {
            // เอา ID และ Role จาก Database (user) ยัดกลับเข้าไปใน Session
            if (session.user) {
                session.user.id = user.id;
                session.user.role = user.role; 
                session.user.isVerifiedStudent = user.isVerifiedStudent;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Redirect ไปที่ Frontend หลังจากขึ้นชื่อเสร็จ
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            return url.startsWith(frontendUrl) ? url : frontendUrl;
        }
    },
    events:{
        async signIn({user}: {user: any}){
            if(user.id){
                await prisma.user.update({
                    where: {id: user.id},
                    data: {lastLoginAt: new Date()},
                });

            }
        },
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
};