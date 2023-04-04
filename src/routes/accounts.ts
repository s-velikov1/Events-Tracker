import { Router, Request, Response } from "express";
import {
    createAccount,
    deleteAccountById,
    getAccountById,
    getAllAccounts,
    updateAccountById
} from "../controllers/accounts";

export const accountRoutes = Router();

accountRoutes
    .route('/')
    .get(getAllAccounts)
    .post(createAccount)
;

accountRoutes
    .route('/:id')
    .get(getAccountById)
    .put(updateAccountById)
    .delete(deleteAccountById)
;
