import { Request, Response } from "express";
import Contact from "@models/Contact";
import { body, validationResult } from "express-validator";
import IContact from "@mytypes/IContact";

const contact = new Contact();

export default class ContactsController {
    public async getAllContacts(req: Request, res: Response): Promise<void> {
        try {
            const contacts = await contact.findAll();

            res.json({
                length: contacts.length,
                contacts
            })
        } catch (err) {
            res.status(500).json({
                message: 'Can not get all contacts: ' + err
            })
        }
    };

    public async createContact(req: Request, res: Response): Promise<void | Response> {
        try {
            await body('first_name').notEmpty().withMessage('First name is required!').run(req);
            await body('last_name').notEmpty().withMessage('Last name is required!').run(req);
            await body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email').run(req);
            await body('phone_number').isMobilePhone('uk-UA').run(req);
            await body('account_id').notEmpty();

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const newContact = await contact.create(req.body as IContact);

            if (newContact) {
                return res.status(201).json({
                    status: 'success',
                    data: newContact
                });
            }
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Can not create contact: ' + err
            });
        }
    };
}
