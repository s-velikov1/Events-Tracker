import express, { Application, NextFunction, Request, Response } from "express";
import AccountsRouter from "./routes/accounts";
import AccountModel from "./models/Account";

import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import Auth from "./middlewares/auth";
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from "cookie-parser";

const LocalStrategy = passportLocal.Strategy;

export default class Server {
    public app: Application;
    private PORT;

    private accountModel: AccountModel;

    constructor() {
        this.app = express();
        this.accountModel = new AccountModel();
        this.PORT = 3001;
        this.config();
        this.passportConfig();
        this.routes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));
        this.app.use(session({
            secret: 'mysecret',
            resave: false,
            saveUninitialized: false,
            // cookie: {
            //     sameSite: 'none',
            //     secure: true,
            //     httpOnly: true
            // }
        })); // TODO: move secret to .env file
        // this.app.use(cookieParser('bigSecret'));
    };

    private routes(): void {
        const accountsRouter = new AccountsRouter();
        this.app.get('/', Auth.isLoggedIn, (req: Request, res: Response) => {
            res.send('home page');
        });
        this.app.use('/api/v1/auth', accountsRouter.router);
        this.app.get('/user', (req, res) => {
            console.log(req.user);
            res.json({
                message: 'here should be your user',
                data: {
                    user: req.user
                }
            })
        })
    };

    private passportConfig(): void {
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new LocalStrategy(async (email, password, done) => {
            try {
                console.log(email, password, ' from new localstrategy');
                
                const userAccount = await this.accountModel.findByEmail(email);
                if (!userAccount) {
                    return done(null, false);
                }

                const passwordMatches = await this.accountModel.checkPassword(email, password);
                if (!passwordMatches) {
                    return done(null, false);
                }

                return done(null, userAccount);
            } catch (err) {
                console.error('new LocalStrategy error: ', err);
                
            }
        }));

        passport.serializeUser((user: any, done) => {
            done(null, user.id)
        });

        passport.deserializeUser(async (id: any, done) => {
            try {
                const account = await this.accountModel.findById(id);
                done(null, account);
            } catch (err) {
                console.error('deserialize error: ', err);
                
            }
        });
    };

    public start(): void {
        this.app.listen(this.PORT, () => { console.log(`Server is listening on port: ${this.PORT}`) })
    };
}
