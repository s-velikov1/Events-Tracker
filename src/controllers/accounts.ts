import { Request, Response } from "express";
import Model from "../models/Model";
import db from "../db/dbConnection";

export default class AccountsController {
    public async getAllAccounts(req: Request, res: Response):Promise<void> {
        // console.log('enter get all accounts');
        
        const model = new Model(db, 'accounts');
        db.connect();
        
        let accounts = await model.findAll();
        db.disconnect();
        // console.log(model);
        console.log(accounts);
        
        res.json(accounts);
    };

    public async createAccount(req: Request, res: Response):Promise<void> {
        console.log(req.body);
        
        res.send('this is createAccount controller response');
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
