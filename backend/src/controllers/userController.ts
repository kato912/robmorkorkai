import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user?.id;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                isVerifiedStudent: true
            }
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
    export const updateMe = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user?.id;
        const { name, image } = req.body; // รับค่าที่ Frontend ส่งมา

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name,
                image: image
            }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
};