// src/types/auth.d.ts
import { DefaultSession } from "@auth/express";

declare module "@auth/express" {
    /**
     * เพิ่ม field ที่เราต้องการลงไปใน interface User
     * เพื่อให้ TypeScript รู้จัก req.user.role หรือ session.user.role
     */
    interface User {
        role: string;
        isVerifiedStudent?: boolean;
        // เพิ่ม field อื่นๆ ที่คุณ return มาจาก profile() ใน auth.ts ได้ที่นี่
    }

    interface Session {
        user: {
            role: string;
            isVerifiedStudent?: boolean;
        } & DefaultSession["user"];
    }
}