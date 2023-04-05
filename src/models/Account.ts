import PostgresPool from "../db/PostgresPool";
import Model from "./Model";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
};

export default class AccountModel extends Model {
    constructor(db: PostgresPool) {
        super(db, 'accounts');
    };
}
