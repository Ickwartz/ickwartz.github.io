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
        let sql = "SELECT * FROM preregistration WHERE lower(email)=lower($email);";
        let params = { $email: this.email };
        let result = await this.#db_functions.queryAll(sql, params);
        console.log(result);
        if (result.length > 0) return true;
        return false;
    }

    async getPreRegisteredList() {
        let sql = "SELECT * FROM preregistration;";
        return await this.#db_functions.queryAll(sql);
    }

    deletePreRegistration(email) {
        let params = { $email: email};
        let sql = "DELETE FROM preregistration WHERE lower(email)=lower($email);";
        this.#db_functions.runQuery(sql, params);
    }
}

module.exports = PreRegistration;