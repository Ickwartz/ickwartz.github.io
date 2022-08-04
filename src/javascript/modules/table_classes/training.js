const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Training extends Table_functions{
    constructor(name, date, user_id, user_notes, repeats) {
        super();
        this.name = name;
        this.date = date;
        this.user_id = user_id;
        this.user_notes = user_notes;
        this.repeats = repeats;
    }

    #db_functions = new Db_Functions();

    getValues() {
        return {
            $name: this.name, 
            $date: this.date, 
            $user_id: this.user_id,
            $user_notes: this.user_notes,
            $repeats: this.repeats
        };
    }

    async saveData() {
        let sql = "INSERT INTO training (name, date, user_id, user_notes, repeats) VALUES ($name, $date, $user_id, $user_notes, $repeats);";
        await this.#db_functions.runQuery(sql, this.getValues());
    }

    async readData() {
        let sql = "SELECT * FROM training;";
        return await this.#db_functions.queryAll(sql);
    }

    async getTrainingId() {
        let sql = "SELECT training_id FROM training WHERE name=$name AND date=$date and user_id=$user_id";
        let params = {
            $name: this.name,
            $date: this.date,
            $user_id: this.user_id
        };
        return await this.#db_functions.queryAll(sql, params);
    }

    async getAllUserTrainings() {
        let sql = "SELECT * FROM training WHERE user_id=$user_id;";
        return await this.#db_functions.queryAll(sql, this.getValues().user_id);
    }

    async getAllUserTrainingMonth(month, year) {
        let sql = "SELECT * FROM training WHERE user_id=$user_id AND strftime('%m', date)=$month AND strftime('%Y', date)=$year;";
        let params = {
            $user_id: this.user_id,
            $month: month,
            $year: year
        };
        return await this.#db_functions.queryAll(sql, params);
    }

    async getTrainingsOfDay(date) {
        let sql = "SELECT * FROM training WHERE user_id=$user_id AND date=$date;";
        let params = {
            $user_id: this.user_id,
            $date: date
        };
        return await this.#db_functions.queryAll(sql, params);
    }

    async trainingExists() {
        let sql = "SELECT * FROM training WHERE name=$name AND date=$date and user_id=$user_id;";
        let params = {
            $name: this.name,
            $date: this.date,
            $user_id: this.user_id
        };
        let result = await this.#db_functions.queryAll(sql, params);
        return (result.length > 0);
    }

    async saveUserNotes(id, notes) {
        let sql = "UPDATE training SET user_notes = $user_notes WHERE training_id = $training_id;";
        let params =  {
            $training_id: id,
            $user_notes: notes
        };
        return await this.#db_functions.runQuery(sql, params);
    }

    async loadUserNotes(id) {
        let sql = "SELECT user_notes FROM training WHERE training_id = $training_id;";
        let params =  {
            $training_id: id
        };
        return await this.#db_functions.queryAll(sql, params);
    }

    async saveRepetition(training_id, start_date, end_date, repetition_pattern) {
        let sql = `
            INSERT INTO training_repetition (training_id, start_date, end_date, repetition_pattern)
            SELECT $training_id, $start_date, $end_date, $repetition_pattern
            WHERE NOT EXISTS (SELECT 1 FROM training_repetition WHERE training_id = $training_id);
        `;
        let params = {
            $training_id: training_id,
            $start_date: start_date,
            $end_date: end_date,
            $repetition_pattern: repetition_pattern
        };

        await this.#db_functions.runQuery(sql,params);
    }

    async loadRepetition(training_id) {
        let sql = 'SELECT * FROM training_repetition WHERE training_id = $training_id;';
        let params = {
            $training_id: training_id
        };
        return await this.#db_functions.queryAll(sql, params);
    }
}

module.exports = Training;