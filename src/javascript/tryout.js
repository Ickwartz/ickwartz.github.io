/*
const exercises = require("./modules/table_classes/exercises");

async function blub() {
    let exercise = new exercises("sad", "afgag")
    exercise.write_table()
    let stuff = await exercise.read_table();
    console.log(stuff)
}

blub()

*/
const table_template = require("./modules/dom_manipulation/templates/table_row")

const testdata = [
    {
        uebung: "Test Übung",
        reps: "100",
        sets: "10",
        comment: "Keine",
        description: "Eine Übung mit 2 Bergen und dem tiefen weiten Meer"
    },
    {
        uebung: "Test Übung 2",
        reps: "200",
        sets: "1",
        comment: "Mach ma erstma 200 davon",
        description: "Nepumuk ist der beste Drache"
    }
]

function fill_exercises_table(items) {
    const table = document.getElementById("exercises_table");
    let table_content = table.innerHTML;
    items.forEach(item => {
        let new_row = table_template(item.uebung, item.reps, item.sets, item.comment, item.description);
        table_content += new_row;
    });
}