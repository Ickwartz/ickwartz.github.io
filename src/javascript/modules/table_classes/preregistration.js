const Db_Functions = require("../db_functions");

class PreRegistration {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    #db_functions = new Db_Functions();

    getValues() {
        return {
            $name: this.name,
            $email: this.email
        };
    }

    preregister() {
        let sql = "INSERT INTO preregistration (name, email) VALUES ($name, $email);";
        this.#db_functions.runQuery(sql, this.getValues());
    }

    async isPreRegistered() {
        let sql = "SELECT * FROM preregistration WHERE email=$email;";
        let params = { $email: this.email };
        let result = await this.#db_functions.queryAll(sql, params);
        if (result > 0) return true;
        return false;
    }

    async getPreRegisteredList() {
        let sql = "SELECT * FROM preregistration;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = PreRegistration;