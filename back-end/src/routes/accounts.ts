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
            .post(passport.authenticate('local'), (req: Request, res: Response) => {
                if (req.user) {
                    return res.status(200).json({
                        error: false,
                        message: 'you are logged in now',
                        data: {
                            user: req.user
                        }
                    });
                }

                return res.status(400).json({
                    error: true,
                    message: 'incorrect mail or password ',
                });
            })
        ;

        this.router
            .route('/logout')
            .get(Auth.logoutAccount)
        ;
    }
}
