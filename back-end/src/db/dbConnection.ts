import PostgresPool from "@db/PostgresPool";
import { Pool } from 'pg';

const pool: Pool = new Pool({
    user: 'event_user',
    // user: 'postgres',
    host: 'localhost',
    database: 'event_tracker',
    password: '12345',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const db = new PostgresPool(pool);
db.initTables();

process.on('exit', async () => {
    console.log('Database pool is shutting down...');
    try {
        await db.disconnect();
        console.log('PostgresPool disconnected');
    } catch (err) {
        console.error('Error disconnecting from PostgresPool: ', err);
    }
})

export default db;
