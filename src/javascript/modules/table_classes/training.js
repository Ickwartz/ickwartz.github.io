const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Training extends Table_functions{
    constructor(name, date, user_id, user_notes) {
        super();
        this.name = name;
        this.date = date;
        this.user_id = user_id;
        this.user_notes = user_notes;
    }

    #db_functions = new Db_Functions();

    getValues() {
        return {
            $name: this.name, 
            $date: this.date, 
            $user_id: this.user_id,
            $user_notes: this.user_notes,
        };
    }

    async saveData() {
        let sql = "INSERT INTO training (name, date, user_id, user_notes) VALUES ($name, $date, $user_id, $user_notes);";
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
        // get all trainings up to 6 months back (6 months = longest possible repetition)
        let dateString = `${month}-01-${year}`;
        let date = new Date(dateString);
        date.setMonth(date.getMonth() - 6);
        let startMonth = "" + (date.getMonth() + 1);
        startMonth = startMonth.length == 1 ? "0" + startMonth : startMonth;
        let startYear = date.getFullYear();

        let sql = `
            SELECT training.*, tr.end_date, tr.repetition_pattern
            FROM training
            LEFT JOIN training_repetition AS tr
            ON training.training_id = tr.training_id
            WHERE training.user_id=$user_id
            AND strftime('%m', date)>=$startMonth AND strftime('%Y', date)>=$startYear
            AND strftime('%m', date)<=$endMonth AND strftime('%Y', date)<=$endYear;
        `;
        let params = {
            $user_id: this.user_id,
            $startMonth: startMonth,
            $startYear: startYear,
            $endMonth: month,
            $endYear: year
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

    async saveRepetition(training_id, end_date, repetition_pattern) {
        let sql = `
            INSERT INTO training_repetition (training_id, end_date, repetition_pattern)
            SELECT $training_id, $end_date, $repetition_pattern
            WHERE NOT EXISTS (SELECT 1 FROM training_repetition WHERE training_id = $training_id);
        `;
        let params = {
            $training_id: training_id,
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