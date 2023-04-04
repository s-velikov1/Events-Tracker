import PostgresDatabase from "./PostgresDatabase";
import { ClientConfig } from 'pg';

const config: ClientConfig = {
    user: 'event_user',
    // user: 'postgres',
    host: 'localhost',
    database: 'event_tracker',
    password: '12345',
    port: 5432
};

const db = new PostgresDatabase(config);

export default db;
