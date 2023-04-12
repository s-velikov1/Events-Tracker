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

    public async initTables(): Promise<any> {        
        const createAccountsTable = `CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY,
            name TEXT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        const createEventParticipantsTable = `CREATE TABLE IF NOT EXISTS event_participants (
            id SERIAL PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone_number TEXT NOT NULL
        )`;

        const createEventsTable = `CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            account_id INTEGER REFERENCES accounts(id),
            participant_id INTEGER REFERENCES event_participants(id)
        )`;

        try {
            await this.query(createAccountsTable);
            await this.query(createEventParticipantsTable);
            await this.query(createEventsTable);
        } catch (err) {
            console.error('Can not init tables: ', err);
        }
    }
}
