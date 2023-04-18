import Model from '@models/Model';
import IContact from '@mytypes/IContact';

export default class Contact extends Model {
    constructor() {
        super('contacts');
    };

    public async create (data: IContact): Promise<any> {
        try {
            const keys = Object.keys(data);
            const values = [data.first_name, data.last_name, data.email, data.phone_number, data.account_id];
            const placeholders = new Array(keys.length).fill('').map((_, i) => `$${i+1}`).join(', ');

            const query = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            console.log(query);
            
            const result = await this.db.query(query, values);

            return result[0];
        } catch (err) {
            console.error('Can not create new EventParticipant insert: ', err);
        }
    };
}
