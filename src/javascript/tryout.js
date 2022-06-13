const sqlite = require("aa-sqlite");
const db = require("./modules/db_instance")

let dbstring = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/src/database/website_db.db";

async function test() {
    await sqlite.open(dbstring);

    try {
        const rows = await sqlite.all("SELECT * FROM exercises;")
        console.log(rows)
    } catch (error) {
        return console.error(error)
    }
    

    sqlite.close()
}

test()