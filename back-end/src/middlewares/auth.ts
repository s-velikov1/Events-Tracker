import passport from "passport";
import { Request, Response, NextFunction } from "express";

export default class Auth {
    public static async loginAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('loginAccount start');
        
        passport.authenticate('local', (err: any, user: any, info: any) => {
            if (err) {
                return next();
            }

            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password'
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next();
                }

                return res.status(200).json({
                    status: 'success',
                    message: 'Logged in successfully'
                });
            })
        })(req, res, next);
    };
    
    public static async logoutAccount(req: Request, res: Response, next: NextFunction): Promise<any> {
        await req.logout((err) => {
            if (err) {
                return next(err);
            }
            
            // res.redirect('/');
        });
        res.send('you are logged out now')
    }

    public static isLoggedIn(req: Request,res: Response, next: NextFunction): void {
        if (req.isAuthenticated()) {
            return next();
        }

        res.send('you are not authenticated and can not get access');
    };

    // public static isLoggedOut(req: Request,res: Response, next: NextFunction): void {
    //     if (!req.isAuthenticated()) {
    //         return next();
    //     }
    // }; TODO: probably I have to remove this method
};
