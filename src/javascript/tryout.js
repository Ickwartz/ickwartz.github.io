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


function mockDB() {
    return [
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
}

module.exports = mockDB()