import { Request, Response } from "express";
import Contact from "@models/Contact";
import { body, validationResult } from "express-validator";

const contact = new Contact();

export default class ContactsController {
    public async createContact(req: Request, res: Response): Promise<void | Response> {
        try {
            await body('firstName').notEmpty().withMessage('First name is required!').run(req);
            await body('lastName').notEmpty().withMessage('Last name is required!').run(req);
            await body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email').run(req);
            await body('phoneNumber').isMobilePhone('uk-UA').run(req);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        } catch (err) {
            
        }
    };
}