import { Router } from "express";
import ContactsController from "@controllers/contacts";

export default class ContactsRouter {
    public router: Router;
    private controller: ContactsController;

    constructor() {
        this.router = Router();
        this.controller = new ContactsController();
        this.routes();
    };

    private routes() {
        this.router
            .route('/')
            .get(this.controller.getAllContacts)
            .post(this.controller.createContact)
        ;
    };
}
