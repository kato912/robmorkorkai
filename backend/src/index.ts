// import { ExpressAuth } from '@auth/express';
// import express from 'express';
// import cors from 'cors'; 
// import type { Express , Request, Response } from 'express';
// import { authConfig } from './config/auth.js';
// import userRoutes from "./routes/userRoutes.js";
// import shopRoutes from "./routes/shopRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import imageRoutes from "./routes/imageRoutes.js";
// import "dotenv/config";

// const app: Express = express();
// const port: number = 3000;

// app.set('trust proxy', 1);

// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,              
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
//     next();
// });
// // Add credentials header for Safari compatibility
// app.use((req: Request, res: Response, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// app.use(express.json());

// app.use("/api/auth",ExpressAuth(authConfig)); //signin / session

// app.use("/api/user", userRoutes);

// app.use("/api/shops", shopRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/images", imageRoutes);

// app.get("/api" , (req:Request , res:Response) => {
//     res.send('api is running');
// });



// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`)
// });

// export default app;

import { ExpressAuth } from '@auth/express';
import express from 'express';
import cors from 'cors'; 
import type { Express, Request, Response } from 'express';
import { authConfig } from './config/auth.js';
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import "dotenv/config";

const app: Express = express();
const port: number = 3000;

app.set('trust proxy', 1);

// ✅ เหลือแค่นี้ชั้นเดียว — ลบ middleware ซ้ำ 2 ตัวออก
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,              
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/auth", ExpressAuth(authConfig));
app.use("/api/user", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imageRoutes);

app.get("/api", (req: Request, res: Response) => {
    res.send('api is running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

export default app;