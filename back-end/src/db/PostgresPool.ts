import { Pool } from 'pg';

export default class PostgresPool {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    };

    public async connect(): Promise<void> {
        await this.pool.connect((err) => {
            if (err) {
                console.error('Error connecting to PostgreSQL: ', err);
            } else {
                console.log('Successfully connected to PostgreSQL database');
                
            }
        });
        console.log('Connected to PostgreSQL database');
    };

    public async disconnect(): Promise<void> {
        await this.pool.end();
        console.log('Disconnected from PostgreSQL database');
    };

    public async query(text: string, values: any[] = []): Promise<any> {
        const result = await this.pool.query(text, values);
        return result.rows;
    };
}
