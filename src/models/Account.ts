import PostgresDatabase from "../db/PostgresDatabase";
import Model from "./Model";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
};

export default class AccountModel extends Model {
    constructor(db: PostgresDatabase) {
        super(db, 'accounts');
    };


}
