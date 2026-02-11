import { ExpressAuth } from '@auth/express';
import express from 'express';
import type { Express , Request, Response } from 'express';
import { authConfig } from './config/auth';
import userRoutes from "./routes/userRoutes.js";
import { swaggerSpec } from './utils/swagger.js';
import swaggerUi from "swagger-ui-express"

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use("/api/auth",ExpressAuth(authConfig)); //signin / session
app.use("/api/user", userRoutes);

app.get("/api" , (req:Request , res:Response) => {
    res.send('api is running');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});