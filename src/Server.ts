import express, { Application, NextFunction, Request, Response } from "express";
import AccountsRouter from "./routes/accounts";
import AccountModel from "./models/Account";

import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Auth from "./middlewares/auth";

export default class Server {
    public app: Application;
    private PORT;

    private accountModel: AccountModel;

    constructor() {
        this.app = express();
        this.accountModel = new AccountModel();
        this.PORT = 3000;
        this.config();
        this.passportConfig();
        this.routes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(session({
            secret: 'bigSecret',
            resave: false,
            saveUninitialized: true
        })); // TODO: move secret to .env file
    };

    private routes():void {
        const accountsRouter = new AccountsRouter();
        this.app.use('/api/v1/auth', accountsRouter.router);
        this.app.get('/', Auth.isLoggedIn, (req: Request,res: Response) => {
            res.send('home page');
        });
    };

    private passportConfig():void {
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            const userAccount = await this.accountModel.findByEmail(email);
            if (!userAccount) {
                return done(null, false);
            }

            const passwordMatches = await this.accountModel.checkPassword(email, password);
            if (!passwordMatches) {
                return done(null, false);
            }

            return done(null, userAccount);
        }));

        passport.serializeUser((user: any, done) => {
            done(null, user.id)
        });

        passport.deserializeUser(async (id: any, done) => {
            const account = await this.accountModel.findById(id);
            done(null, account);
        });

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    };

    public start(): void {
        this.app.listen(this.PORT, () => { console.log(`Server is listening on port: ${this.PORT}`) })
    };
}
