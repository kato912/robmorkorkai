import { Request, Response , NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "../config/auth";

export const  requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("1. Middleware started"); 
        const session = await getSession(req, authConfig);
        console.log("2. Session result:", session);
        if (!session || !session.user) {
            console.log("3. No session found -> Sending 401");
            return res.status(401).json({ message: "Unauthorized Please Sign In" });
        }
        res.locals.user = session.user;
        next();
    }catch(error){
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    // เรียกใช้ requireAuth ก่อนเพื่อให้แน่ใจว่า Login แล้ว (หรือจะเรียกซ้อนกันใน Route ก็ได้)
    const session = await getSession(req, authConfig);

    if (!session || session.user?.role !== "ADMIN") {
        res.status(403).json({ message: "Forbidden: Admins only" });
        return;
    }

    next();
}