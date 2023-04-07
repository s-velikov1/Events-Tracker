import PostgresPool from "../db/PostgresPool";
import IAccount from "../types/IAccount";

export default abstract class Model {
    protected db: PostgresPool;
    protected table: string;

    constructor(db: PostgresPool, table: string) {
        this.db = db;
        this.table = table;
    };

    public async findAll(): Promise<any> {
        const result = await this.db.query(`SELECT * FROM ${this.table}`);
        return result;
    };

    public async findById(id: number): Promise<any> {
        const result = await this.db.query(`SELECT * FROM ${this.table} WHERE id = ${id}`);
        return result[0];
    };

    // public async create(data: IAccount): Promise<any> {
    //     try {
    //         const keys = Object.keys(data);
    //         const values = Object.values(data);
    //         console.log(keys, values);
    //         const placeholders = new Array(keys.length).fill('').map((_, i) => `$${i+1}`).join(', ');
    //         const result = await this.db.query(`INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`, values);
    //         console.log(result);

    //         return result[0];
    //     } catch (err) {
    //         console.error(`Can not create new db insert with next data: \n ${JSON.stringify(data)} \n`, err);
            
    //     }
    // }

    public abstract create(data: any): Promise<any>;
};
