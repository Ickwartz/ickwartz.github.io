const Table_functions = require("../table_functions");

class Users extends Table_functions{
    constructor(firstname, surname) {
        super();    // constructor for Table_functions
        this.firstname = firstname;
        this.surname = surname;

    }
}

module.exports = Users