import { Request, Response, NextFunction } from "express";

export default class Auth {
    public static async logoutAccount(req: Request, res: Response, next: NextFunction): Promise<any> {
        await req.logout((err) => {
            if (err) {
                return next(err);
            }
        });
        res.send('you are logged out now')
    }

    public static isLoggedIn(req: Request,res: Response, next: NextFunction): void {
        if (req.isAuthenticated()) {
            return next();
        }

        res.send('you are not authenticated and can not get access');
    };
};
