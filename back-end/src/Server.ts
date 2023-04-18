import express, { Application, Request, Response } from "express";
import AccountsRouter from "@routes/accounts";
import ContactsRouter from "@routes/contacts";
import AccountModel from "@models/Account";
import Auth from "@middlewares/auth";

import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';

export default class Server {
    public app: Application;
    private PORT;
    private serverInstance: any;

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
        })); // TODO: move secret to .env file
    };

    private routes(): void {
        const accountsRouter = new AccountsRouter();
        const contactRouter = new ContactsRouter();

        this.app.get('/', Auth.isLoggedIn, (req: Request, res: Response) => {
            res.send('home page');
        });
        this.app.use('/api/v1/auth', accountsRouter.router);
        // this.app.get('/user', (req, res) => {
        //     res.json({
        //         message: 'here should be your user',
        //         data: {
        //             user: req.user
        //         }
        //     })
        // });
        this.app.use('/api/v1/contacts', contactRouter.router);
    };

    private passportConfig(): void {
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
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
        this.serverInstance = this.app.listen(this.PORT, () => {
            console.log(`Server is listening on port: ${this.PORT}`)
        });

        process.on('SIGTERM', () => {
            console.log('Closing server...');
            this.serverInstance.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('Closing server...');
            this.serverInstance.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    };

    public stop(): void {
        this.serverInstance.close(() => {
            console.log('Server has been stopped!');
        })
    }
}
