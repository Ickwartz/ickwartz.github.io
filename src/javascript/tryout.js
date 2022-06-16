
/*const exercises = require("./modules/table_classes/exercises");

async function blub() {
    let exercise = new exercises("sad", "afgag");
    //xercise.write_table()
    let stuff = await exercise.read_table();
    console.log(stuff);
}

blub();

*/

const p_e = require("./modules/table_classes/personalized_exercises");

async function testInnerJoin() {
    let pe_interface = new p_e();
    let data = await pe_interface.innerJoinExercises();
    console.log(data);
}

testInnerJoin();