const Table_functions = require("./table_functions");

class Users extends Table_functions{
    constructor(first_name, surname, email) {
        super();    // constructor for Table_functions
        this.first_name = first_name;
        this.surname = surname;
        this.email = email;
        this.member_since = this.getDate() 
    }

    getInsertSQL() {
        return `
            INSERT INTO users (first_name, surname, email, member_since)
            VALUES (?,?,?,?)
            ;`
    }

    getSelectSQL() {
        return "SELECT * FROM users;"
    }
}

module.exports = Users