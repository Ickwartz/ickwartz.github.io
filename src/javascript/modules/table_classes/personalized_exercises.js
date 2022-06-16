const Table_functions = require("../table_functions");
const db_instance = require("../db_instance");

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
    #db = db_instance;

    #insertSQL = `
            INSERT INTO personalized_exercises (exercise_id, user_id, reps, sets, comment, training_id)
            VALUES (?,?,?,?,?,?)
            ;`;

    #readSQL = "SELECT * FROM personalized_exercises;";

    #innerJoinExercisesSQL = `
        SELECT pe.exercise_id, pe.reps, pe.sets, pe.comment, e.name, e.description
        FROM personalized_exercises AS pe
        INNER JOIN exercises AS e
        ON pe.exercise_id = e.exercise_id
        ;`;
    
    write_table() {
        let values = this.getValues();
        
        let query = this.#db.prepare(this.#insertSQL);
        
        query.run(values, (err) => {
            if (err) {
                throw (err);
            } else {
                console.log("success");
            }
        });
    }

    async innerJoinExercises() {

        return new Promise ((resolve, reject) => {
            this.#db.serialize(() => {
                let query = this.#db.prepare(this.#innerJoinExercisesSQL);
                query.all((err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        })
        .catch(err => {throw err});
    }
}

module.exports = Personalized_Exercises