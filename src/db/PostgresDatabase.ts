import { Client, ClientConfig } from 'pg';

export default class PostgresDatabase {
    private client: Client;

    constructor(config: ClientConfig) {
        this.client = new Client(config);
    };

    public async connect(): Promise<void> {
        await this.client.connect((err) => {
            if (err) {
                console.error('Error connecting to PostgreSQL: ', err);
            } else {
                console.log('Successfully connected to PostgreSQL database');
                
            }
        });
        console.log('Connected to PostgreSQL database');
    };

    public async disconnect(): Promise<void> {
        await this.client.end();
        console.log('Disconnected from PostgreSQL database');
    };

    public async query(text: string, values: any[] = []): Promise<any> {
        const result = await this.client.query(text, values);
        return result.rows;
    };
}
