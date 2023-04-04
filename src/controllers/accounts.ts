import { Request, Response } from "express";

export default class AccountsController {
    public async getAllAccounts(req: Request, res: Response) {
        res.send('this is getAllAccounts controller response');
    };

    public async createAccount(req: Request, res: Response) {
        res.send('this is createAccount controller response');
    };

    public async deleteAccountById(req: Request, res: Response) {
        res.send('this is deleteAccount controller response');
    };
    
    public async getAccountById(req: Request, res: Response) {
        res.send('this is getAccountById controller response');
    };

    public async updateAccountById(req: Request, res: Response) {
        res.send('this is updateAccountById controller response');
    };

}
