import { Router, Request, Response } from "express";
import AccountsController from "../controllers/accounts";

export default class AccountsRouter {
    public router: Router;
    private controller: AccountsController;

    constructor() {
        this.router = Router();
        this.controller = new AccountsController();
        this.routes();
    };

    private routes(): void {
        this.router
            .route('/register')
            // .get(this.controller.getAllAccounts)
            .post(this.controller.createAccount)
        ;

        this.router
            .route('/login')
            // .post(loginMethod) TODO: login

        // this.router
        //     .route('/:id')
        //     .get(this.controller.getAccountById)
        //     .put(this.controller.updateAccountById)
        //     .delete(this.controller.deleteAccountById)
        // ;
    }
}
