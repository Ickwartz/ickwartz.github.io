const Personalized_Exercises = require("./modules/table_classes/personalized_exercises");

async function blub() {
    let personalized_exercises = new Personalized_Exercises();
    
    let result = await personalized_exercises.getExercisesWithTrainingId(27);
    console.log("RESULT: ", result);
}

blub();