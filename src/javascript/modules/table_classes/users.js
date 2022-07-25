const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Users extends Table_functions{
    constructor(first_name, surname, email) {
        super();    // constructor for Table_functions
        this.first_name = first_name;
        this.surname = surname;
        this.email = email;
        this.member_since = this.getDate();
    }

    #db_functions = new Db_Functions();

    getValues() {
        return {
            $first_name: this.first_name,
            $surname: this.surname,
            $email: this.email,
            $member_since: this.member_since
        };
    }

    async getUserInfoFromMail() {
        let params = {$email: this.email};
        let sql = "SELECT * FROM users WHERE lower(email) = lower($email)";
        return await this.#db_functions.queryAll(sql, params);
    }

    async getUserIDFromName() {
        let sql = "SELECT user_id FROM users WHERE lower(first_name)=lower($first_name) AND lower(surname)=lower($surname)";
        let params = {$first_name: this.first_name, $surname: this.surname};
        return await this.#db_functions.queryAll(sql, params);
    }

    async safeData() {
        let sql = "INSERT INTO users (first_name, surname, email, member_since) VALUES ($first_name, $surname, $email, $member_since);";
        return await this.#db_functions.runQuery(sql, this.getValues()); 
    }

    async readData() {
        let sql = "SELECT * FROM users;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = Users;