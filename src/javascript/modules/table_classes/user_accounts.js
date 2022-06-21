const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class User_Accounts extends Table_functions{
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    #db_functions = new Db_Functions();

    async verifyUser() {
        let sql = "SELECT * FROM user_accounts WHERE email = ? AND password = ?;";
        let login_data = this.getValues();

        let result = await this.#db_functions.queryAll(sql, login_data);
        console.log("i shouldnt run")
        return new Promise((resolve, reject) => {
            if (result.length > 0) {
                resolve(true)
            }
            resolve(false)
        })
        .catch(err => {throw err})
        
    }
}

module.exports = User_Accounts;