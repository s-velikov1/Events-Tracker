import IAccount from "@mytypes/IAccount";
import Model from "@models/Model";
import bcrypt from 'bcrypt';

export default class AccountModel extends Model {
    constructor() {
        super('accounts');
    };

    public async create(data: IAccount): Promise<any> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);

            const keys = Object.keys(data);
            const values = [data.name, data.email, hashedPassword];
            const placeholders = new Array(keys.length).fill('').map((_, i) => `$${i+1}`).join(', ');

            const query = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;

            const result = await this.db.query(query, values);
            return result[0];
        } catch (err) {
            console.error(`Can not create new accounts insert with next data: \n ${JSON.stringify(data)} \n`, err);
        }
    };

    public async findByEmail(email: string): Promise<IAccount> {
        const query = `SELECT id, name, email, password FROM ${this.table} WHERE email = '${email}'`;
        const result = await this.db.query(query);

        return result[0];
    };

    public async checkPassword(email: string, password: string): Promise<boolean> {
        const account = await this.findByEmail(email);
        
        if (!account) {
            return false;
        }

        return await bcrypt.compare(password, account.password);
    };
}
