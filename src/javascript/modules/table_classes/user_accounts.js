const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

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
        }
    }

    async verifyUser() {
        let sql = "SELECT * FROM user_accounts WHERE email = ? AND password = ?;";
        let login_data = this.getValues();

        let result = await this.#db_functions.queryAll(sql, login_data);
        if (result.length > 0) {
            return true
        }
        return (false);
    }
    
    async safeData() {
        let sql = `INSERT INTO user_accounts (user_id, email, password) 
                    VALUES ((SELECT user_id from users WHERE $email = users.email), $email ,$password);`;
        await this.#db_functions.runQuery(sql, this.getValues());
    }

    async readData() {
        let sql = "SELECT * FROM user_accounts;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = User_Accounts;