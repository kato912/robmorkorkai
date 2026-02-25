import { ExpressAuth } from '@auth/express';
import express from 'express';
import cors from 'cors'; 
import type { Express , Request, Response } from 'express';
import { authConfig } from './config/auth.js';
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app: Express = express();
const port: number = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // อนุญาตเฉพาะ Frontend ของคุณ
    credentials: true,               // อนุญาตให้ส่ง Cookies/Auth Header
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/auth",ExpressAuth(authConfig)); //signin / session

app.use("/api/user", userRoutes);

app.use("/api/shops", shopRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/api" , (req:Request , res:Response) => {
    res.send('api is running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});