import { Router } from "express";
import AccountsController from "../controllers/accounts";
import Auth from "../middlewares/auth";
import passport from "passport";
import { Request, Response } from "express";

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
            // .post(passport.authenticate('local'), (req: Request, res: Response) => {
            //     res.json({
            //         message: 'you are logged in now',
            //         data: {
            //             user: req.user
            //         }
            //     })
            // })
        ;

        this.router
            .route('/logout')
            .get(Auth.logoutAccount)
        ;
    }
}
