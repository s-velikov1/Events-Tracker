import { Request, Response } from "express";
import Account from "../models/Account";
import db from "../db/dbConnection";
import { body, validationResult } from 'express-validator';
import IAccount from "../types/IAccount";

export default class AccountsController {
    public async getAllAccounts(req: Request, res: Response):Promise<void> {
        const account = new Account(db);
        
        let accounts = await account.findAll();
        
        res.json(accounts);
    };

    public async createAccount(req: Request, res: Response):Promise<void> {
        try {
            await body('name').notEmpty().withMessage('Name is required').run(req);
            await body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email').run(req);
            await body('password').notEmpty().withMessage('Password is required').run(req);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }

            const account = new Account(db);
            console.log(req.body as IAccount);
            
            account.create(req.body as IAccount);
            
            res.send('this is createAccount controller response');
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Can not create account'
            })
        }
    };

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
