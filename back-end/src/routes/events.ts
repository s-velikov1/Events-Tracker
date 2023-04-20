import { Router } from "express";
import EventsController from "@controllers/events";

export default class ContactsRouter {
    public router: Router;
    private controller: EventsController;

    constructor() {
        this.router = Router();
        this.controller = new EventsController();
        this.routes();
    };

    private routes() {
        this.router
            .route('/')
            .post(this.controller.createEvent)
        ;

        this.router
            .route('/:id')
            .get(this.controller.getEventsByContactId)
        ;
    };
}
