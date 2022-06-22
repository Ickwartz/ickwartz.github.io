const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Users extends Table_functions{
    constructor(first_name, surname, email) {
        super();    // constructor for Table_functions
        this.first_name = first_name;
        this.surname = surname;
        this.email = email;
        this.member_since = this.getDate() 
    }

    #db_functions = new Db_Functions();

    getValues() {
        return [this.first_name, this.surname, this.email, this.member_since]
    }

    async safeData() {
        let sql = "INSERT INTO users (first_name, surname, email, member_since) VALUES (?,?,?,?);";
        await this.#db_functions.runQuery(sql, this.getValues())
    }

    async readData() {
        let sql = "SELECT * FROM users;";
        return await this.#db_functions.queryAll(sql)
    }
}

module.exports = Users