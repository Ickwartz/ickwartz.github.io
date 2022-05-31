const Table_functions = require("../table_functions");

class Exercises extends Table_functions{
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
    }

    getInsertSQL() {
        return `
            INSERT INTO exercises (name, description)
            VALUES (?,?)
            ;`
    }

    getSelectSQL() {
        return "SELECT * FROM exercises;"
    }
}

module.exports = Exercises