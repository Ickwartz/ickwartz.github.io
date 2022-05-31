const Table_functions = require("../table_functions");

class Exercises extends Table_functions{
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
    }
}

module.exports = Exercises