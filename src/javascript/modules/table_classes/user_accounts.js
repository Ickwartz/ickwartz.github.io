const Table_functions = require("../table_functions");

class User_Accounts extends Table_functions{
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    getInsertSQL() {
        return `
            INSERT INTO user_accounts (email, password)
            VALUES (?,?)
            ;`
    }

    getSelectSQL() {
        return "SELECT * FROM user_accounts;"
    }
}

module.exports = User_Accounts