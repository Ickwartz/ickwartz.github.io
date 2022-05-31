const Table_functions = require("../table_functions");

class User_Accounts extends Table_functions{
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    getColumnCount() { return 2}
}

module.exports = User_Accounts