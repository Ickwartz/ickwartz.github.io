const Table_functions = require("../table_functions");
const db_instance = require("../db_instance");

class User_Accounts extends Table_functions{
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    #db = db_instance;

    #verifySQL = "SELECT * FROM user_accounts WHERE email = ? AND password = ?;";

    async verifyUser() {
        return new Promise ((resolve, reject) => {
            let login_data = this.getValues();
            this.#db.serialize(() => {
                let query = this.#db.prepare(this.#verifySQL);
                query.all(login_data, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    if (rows.length > 0) {
                        resolve(true);
                    }
                    resolve(false);
                });
            });
        })
        .catch(err => {throw err;});
    }
}

module.exports = User_Accounts;