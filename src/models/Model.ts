import PostgresDatabase from "../db/PostgresDatabase";

export default class Model {
    protected db: PostgresDatabase;
    protected table: string;

    constructor(db: PostgresDatabase, table: string) {
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

    public async create(data: any): Promise<any> {
        console.log(data);
        
    }
};

