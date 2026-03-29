import { ExpressAuth } from '@auth/express';
import express from 'express';
import type { Express , Request, Response } from 'express';
import cors from 'cors';
import { authConfig } from './config/auth.js';
import userRoutes from "./routes/userRoutes.js";
import { swaggerSpec } from './utils/swagger.js';
import swaggerUi from "swagger-ui-express"
import shopRoutes from "./routes/shopRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// ...
const app: Express = express();
const port: number = 3000;


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/auth",ExpressAuth(authConfig)); //signin / session
app.use("/api/user", userRoutes);

app.use("/api/shops", shopRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api" , (req:Request , res:Response) => {
    res.send('api is running');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});