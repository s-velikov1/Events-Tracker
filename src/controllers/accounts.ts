import { Request, Response } from "express";
import Account from "../models/Account";
import db from "../db/dbConnection";
import { body, validationResult } from 'express-validator';
import IAccount from "../types/IAccount";

export default class AccountsController {
    public async getAllAccounts(req: Request, res: Response):Promise<void> {
        // console.log('enter get all accounts');
        
        const model = new Account(db);
        
        let accounts = await model.findAll();
        // console.log(model);
        console.log(accounts);
        
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
            
            account.create(req.body as IAccount); // TODO: Create interface for account req.body
            
            res.send('this is createAccount controller response');
        } catch (err) {
            
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
