import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Event from '@models/Event'
import IEvent from '@mytypes/IEvent';

const event = new Event();

export default class EventsController {
    public async getEventsByContactId(req: Request, res: Response):Promise<void> {
        try {
            let events = await event.findByContactId(Number(req.params.id));
        
            res.json({
                message: 'success',
                length: events.length,
                events
            });
        } catch (err) {
            res.status(500).json({
                message: 'error',
                error: err
            })
        }
    };

    public async createEvent(req: Request, res: Response, next: NextFunction):Promise<void | Response> {
        try {
            await body('title').notEmpty().withMessage('Title is required').run(req);
            await body('description').notEmpty().withMessage('Description is required').run(req);
            await body('start_date').notEmpty().withMessage('Start date is required').run(req);
            await body('end_date').notEmpty().withMessage('End date is required').run(req);
            await body('contact_id').notEmpty().withMessage('Contact id is required').run(req);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const isTimeAvailable = await event.isTimeAvailable(req.body.start_date, req.body.end_date);
            if (isTimeAvailable) {
                const newEvent = await event.create(req.body as IEvent);
                return res.status(201).json({
                    status: 'success',
                    data: newEvent
                });
            } else {
                return res.status(201).json({
                    status: 'error',
                    message: 'There is an event for this time.'
                });
            }

        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Can not create event: ' + err
            });
        }
    };
}
