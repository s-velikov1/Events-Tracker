import express, { Express, Request, Response } from "express";
import { accountRoutes } from './routes/accounts';

const PORT = 3000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('this is default route');
})
app.use('/accounts', accountRoutes);

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
