//const sqlite = require("aa-sqlite");
const exercises = require("./modules/table_classes/exercises");

/*
async function test() {
    await sqlite.open()
    try {
        const rows = await sqlite.all("SELECT * FROM exercises;")
        console.log(rows)
    } catch (error) {
        return console.error(error)
    }
}


const Db_Handler = require("./modules/db_handler")

let db_handler = new Db_Handler();

db_handler.read_table("exercises")



*/


async function blub() {
    let exercise = new exercises("sad", "afgag")
    exercise.write_table()
    let stuff = await exercise.read_table();
    console.log(stuff)
}

blub()
