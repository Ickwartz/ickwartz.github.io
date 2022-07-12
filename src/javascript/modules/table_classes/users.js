const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Users extends Table_functions{
    constructor(first_name, surname, email) {
        super();    // constructor for Table_functions
        this.first_name = first_name;
        this.surname = surname;
        this.email = email;
        this.member_since = this.getDate();
        this.#formatInputs();
    }

    #db_functions = new Db_Functions();

    #formatInputs() {
        this.first_name ? this.first_name = this.first_name.trim().toLowerCase() : this.first_name;
        this.surname ? this.surname = this.surname.trim().toLowerCase() : this.surname;
        this.email ? this.email = this.email.trim().toLowerCase() : this.email;
    }

    getValues() {
        return {
            $first_name: this.first_name,
            $surname: this.surname,
            $email: this.email,
            $member_since: this.member_since
        };
    }

    async getUserIDFromName() {
        let sql = "SELECT user_id FROM users WHERE first_name=$first_name AND surname=$surname";
        let params = {$first_name: this.first_name, $surname: this.surname};
        return await this.#db_functions.queryAll(sql, params);
    }

    async safeData() {
        let sql = "INSERT INTO users (first_name, surname, email, member_since) VALUES ($first_name, $surname, $email, $member_since);";
        await this.#db_functions.runQuery(sql, this.getValues()); 
    }

    async readData() {
        let sql = "SELECT * FROM users;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = Users;