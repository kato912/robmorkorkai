import { ExpressAuth } from '@auth/express';
import express from 'express';
import type { Express , Request, Response } from 'express';
import { authConfig } from './config/auth';

const app: Express = express();
const port: number = 3000;

app.use("/api/auth",ExpressAuth(authConfig)); //signin / session

app.get("/api" , (req:Request , res:Response) => {
    res.send('api is running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});