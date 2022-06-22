const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Exercises extends Table_functions{
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
    }

    #db_functions = new Db_Functions();

    getValues() {
        return [this.name, this.description]
    }

    safeData() {
        let sql = "INSERT INTO exercises (name, description) VALUES (?,?);";
        this.#db_functions.runQuery(sql, this.getValues());
    }

    async readData() {
        let sql = "SELECT * FROM exercises;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = Exercises;