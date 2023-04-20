import Model from '@models/Model';
import IEvent from '@mytypes/IEvent';

export default class Event extends Model {
    constructor() {
        super('events');
    };

    public async create(data: IEvent): Promise<any> {
        try {
            const keys = Object.keys(data);
            const values = [data.title, data.description, data.start_date, data.end_date, data.contact_id];
            const placeholders = new Array(keys.length).fill('').map((_, i) => `$${i+1}`).join(', ');

            const query = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            console.log(query);
            
            const result = await this.db.query(query, values);

            return result[0];
        } catch (err) {
            console.error('Can not create new Event insert: ', err);
        }
    };

    public async isTimeAvailable(startDate: Date, endDate: Date): Promise<boolean | undefined> {
        try {
            const query = `SELECT * FROM ${this.table}
                WHERE start_date <= $1
                AND end_date >= $2
            `;
            const values = [startDate, endDate];
            const result = await this.db.query(query, values);

            return result.length ? false : true;
        } catch (err) {
            console.error('isTimeAvailable method error: ', err);
        }
    };

    public async findByContactId(contactId: number): Promise<any> {
        try {
            const query = `SELECT * FROM ${this.table}
                WHERE contact_id = $1
            `;
            const result = await this.db.query(query, [contactId]);

            return result;
        } catch (err) {
            console.error('Event model, findByContactId method error: ', err);
        }
    };
}
