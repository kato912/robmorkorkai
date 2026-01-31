import express from 'express';
import type { Express , Request, Response } from 'express';

const app: Express = express();
const port: number = 3000;

app.get("/" , (req:Request , res:Response) => {
    res.send('running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});