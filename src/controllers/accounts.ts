import { Request, Response } from "express";

const getAllAccounts = async (req: Request, res: Response) => {
    res.send('this is getAllAccounts controller response');
};

const createAccount = async (req: Request, res: Response) => {
    res.send('this is createAccount controller response');
};

const deleteAccountById = async (req: Request, res: Response) => {
    res.send('this is deleteAccount controller response');
};

const getAccountById = async (req: Request, res: Response) => {
    res.send('this is getAccountById controller response');
};

const updateAccountById = async (req: Request, res: Response) => {
    res.send('this is updateAccountById controller response');
};

export {
    getAllAccounts,
    createAccount,
    deleteAccountById,
    getAccountById,
    updateAccountById
}
