const Table_functions = require("./table_functions");
const Db_Functions = require("../db_functions");

class Personalized_Exercises extends Table_functions{
    constructor(exercise_id, user_id, reps, sets, comment, training_id) {
        super();
        this.exercise_id = exercise_id;
        this.user_id = user_id;
        this.reps = reps;
        this.sets = sets;
        this.comment = comment;
        this.training_id = training_id;
    }
    
    #db_functions = new Db_Functions();

    getValues() {
        return {
            $exercise_id: this.exercise_id,
            $user_id: this.user_id,
            $reps: this.reps,
            $sets: this.sets,
            $comment: this.comment,
            $training_id: this.training_id
        };
    }
    
    async safeData() {
        let sql = `INSERT INTO personalized_exercises (exercise_id, user_id, reps, sets, comment, training_id)
                    VALUES ($exercise_id, $user_id, $reps, $sets, $comment, $training_id);`;
        await this.#db_functions.runQuery(sql, this.getValues());
    }

    async readData() {
        let sql = "SELECT * FROM personalized_exercises;";
        return await this.#db_functions.queryAll(sql);
    }

    async innerJoinExercises() {

        let sql = `
        SELECT pe.exercise_id, pe.reps, pe.sets, pe.comment, e.name, e.description
        FROM personalized_exercises AS pe
        INNER JOIN exercises AS e
        ON pe.exercise_id = e.exercise_id
        ;`;

        return await this.#db_functions.queryAll(sql);
    }
}

module.exports = Personalized_Exercises;