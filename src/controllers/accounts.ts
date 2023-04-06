import { NextFunction, Request, Response } from "express";
import Account from "../models/Account";
import db from "../db/dbConnection";
import { body, validationResult } from 'express-validator';
import IAccount from "../types/IAccount";
import passport from 'passport';

export default class AccountsController {
    public async getAllAccounts(req: Request, res: Response):Promise<void> {
        const account = new Account(db);
        
        let accounts = await account.findAll();
        
        res.json(accounts);
    };

    public async createAccount(req: Request, res: Response, next: NextFunction):Promise<void | Response> {
        try {
            await body('name').notEmpty().withMessage('Name is required').run(req);
            await body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email').run(req);
            await body('password').notEmpty().withMessage('Password is required').run(req);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            
            const account = new Account(db);

            const existedAccount = await account.findByEmail(req.body.email);

            if (existedAccount) {
                return res.status(409).json({
                    status: 'error',
                    message: 'User with this email already exist'
                });
            }

            console.log(req.body, 'body');
            
            const newAccount = await account.create(req.body as IAccount);
            
            return res.status(201).json({
                status: 'success',
                data: newAccount
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Can not create account'
            })
        }
    };

    public async loginAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('loginAccount start');
        
        passport.authenticate('local', (err: any, user: any, info: any) => {
            if (err) {
                return next();
            }

            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password'
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next();
                }

                return res.status(200).json({
                    status: 'success',
                    message: 'Logged in successfully'
                });
            })
        })(req, res, next);
    }

    public async deleteAccountById(req: Request, res: Response):Promise<void> {
        res.send('this is deleteAccount controller response');
    };
    
    public async getAccountById(req: Request, res: Response):Promise<void> {
        res.send('this is getAccountById controller response');
    };

    public async updateAccountById(req: Request, res: Response):Promise<void> {
        res.send('this is updateAccountById controller response');
    };

}
