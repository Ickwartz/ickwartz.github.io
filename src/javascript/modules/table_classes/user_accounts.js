const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");
const hashing = require("../helpers/hashing");

class User_Accounts extends Table_functions{
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    #db_functions = new Db_Functions();

    getValues() {
        return {
            $email: this.email, 
            $password: this.password
        };
    }

    async verifyUser() {
        let sql = "SELECT * FROM user_accounts WHERE lower(email) = lower($email);";
        let login_data = this.getValues();

        let result = await this.#db_functions.queryAll(sql, login_data.$email);
        if (result.length > 0) {
            return await hashing.comparePasswords(login_data.$password, result[0].password);
        }
        return false;
    }

    async isAdmin() {
        let sql = "SELECT * FROM admins WHERE lower(email) = lower($email);";
        let email = this.getValues().$email;
        let result = await this.#db_functions.queryAll(sql, email);

        if (result.length > 0) {
            return true;
        }
        return false;
    }

    async isRegistered() {
        let sql = "SELECT * FROM user_accounts WHERE lower(email) = lower($email);";
        let params = {
            $email: this.email
        };
        let res = await this.#db_functions.queryAll(sql, params);

        return (res.length > 0) ? true : false;
    }
    
    async safeData() {
        let sql = `INSERT INTO user_accounts (user_id, email, password) 
                    VALUES ((SELECT user_id from users WHERE lower($email) = lower(users.email)), $email ,$password);`;
        await this.#db_functions.runQuery(sql, this.getValues());
    }

    async readData() {
        let sql = "SELECT * FROM user_accounts;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = User_Accounts;