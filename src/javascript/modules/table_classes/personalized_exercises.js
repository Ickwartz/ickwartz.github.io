const Table_functions = require("../table_functions");

class Personalized_Exercises extends Table_functions{
    constructor(exercise_id, user_id, reps, sets, comment, training_id) {
        super();
        this.exercise_id = exercise_id;
        this.user_id = user_id;
        this.reps = reps;
        this.sets = sets;
        this.comment = comment
        this.training_id = training_id
    }
}

module.exports = Personalized_Exercises