import express, { Application } from "express";
import AccountsRouter from "./routes/accounts";

export default class Server {
    public app: Application;
    private PORT;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.PORT = 3000;
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    };

    private routes():void {
        const accountsRouter = new AccountsRouter();
        this.app.use('/api/v1/auth', accountsRouter.router);
    };

    public start(): void {
        this.app.listen(this.PORT, () => { console.log(`Server is listening on port: ${this.PORT}`) })
    }
}
