const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Exercises extends Table_functions{
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
        this.#formatInputs();
    }

    #db_functions = new Db_Functions();

    #formatInputs() {
        this.name ? this.name.trim().toLowerCase() : this.name;
    }

    getValues() {
        return {
            $name: this.name,
            $description: this.description
        };
    }

    async getExerciseIdFromName() {
        let sql = "SELECT exercise_id FROM exercises WHERE name=$name";
        let params = {$name: this.name};
        return await this.#db_functions.queryAll(sql, params);
    }

    async saveData() {
        let values = this.getValues();
        if (!(await this.existsInTable(values.$name))) {
            let sql = "INSERT INTO exercises (name, description) VALUES ($name, $description);";
            await this.#db_functions.runQuery(sql, values);
            return {result: true, message: `${values.$name} erfolgreich gespeichert`};
        } else {
            return {result: false, message: `${values.$name} existiert schon in der Datenbank`};
        }
    }

    async existsInTable() {
        let sql = "SELECT * FROM exercises WHERE name = $name";
        let result = await this.#db_functions.queryAll(sql, this.getValues().$name);
        if (result.length > 0) {    
            return true;
        }
        return false;
    }

    async readData() {
        let sql = "SELECT * FROM exercises;";
        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = Exercises;