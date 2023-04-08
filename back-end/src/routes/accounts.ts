import { Router } from "express";
import AccountsController from "../controllers/accounts";
import Auth from "../middlewares/auth";

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
            .get(this.controller.getAllAccounts)
            .post(this.controller.createAccount)
        ;

        this.router
            .route('/login')
            .post(Auth.loginAccount)
        ;

        this.router
            .route('/logout')
            .get(Auth.logoutAccount)
        ;
    }
}
