const Db_Functions = require("../db_functions");

class Registration {
    constructor(name, email, status) {
        this.name = name;
        this.email = email;
        this.status = status;
    }

    #db_functions = new Db_Functions();

    getValues() {
        return {
            $name: this.name,
            $email: this.email,
            $status: this.status
        };
    }

    register() {
        let sql = "INSERT INTO registration (name, email, status) VALUES ($name, $email, $status);";
        this.#db_functions.runQuery(sql, this.getValues());
    }

    async isRegistered() {
        let sql = "SELECT * FROM registration WHERE email=$email;";
        let params = { $email: this.email };
        let result = await this.#db_functions.queryAll(sql, params);
        if (result > 0) return true;
        return false;
    }

    async getRegisteredList() {
        let sql = "SELECT * FROM registration;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = Registration;