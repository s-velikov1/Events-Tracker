import PostgresPool from "@db/PostgresPool";
import db from "@db/dbConnection";

export default abstract class Model {
    protected db: PostgresPool;
    protected table: string;

    constructor(table: string) {
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

    public abstract create(data: any): Promise<any>;
};
