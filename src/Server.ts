import express, { Application } from "express";
import AccountsRouter from "./routes/accounts";
import AccountModel from "./models/Account";
import db from "./db/dbConnection";

import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export default class Server {
    public app: Application;
    private PORT;

    private accountModel: AccountModel;

    constructor() {
        this.app = express();
        this.accountModel = new AccountModel(db);
        this.PORT = 3000;
        this.config();
        this.routes();
        this.passportConfig();
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
    };

    private passportConfig():void {
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            const userAccount = this.accountModel.findByEmail(email);
            if (!userAccount) {
                return done(null, false);
            }

            const passwordMatches = this.accountModel.checkPassword(email, password);
            if (!passwordMatches) {
                return done(null, false);
            }

            return done(null, userAccount);
        }));

        passport.serializeUser((user: any, done) => {
            done(null, user.id)
        });

        passport.deserializeUser(async (id: any, done) => {
            const account = this.accountModel.findById(id);
            done(null, account);
        });

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    };

    public start(): void {
        this.app.listen(this.PORT, () => { console.log(`Server is listening on port: ${this.PORT}`) })
    };
}
