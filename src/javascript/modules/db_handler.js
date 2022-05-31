const sqlite3 = require("sqlite3").verbose();   // verbose = sql errors are shown 

class Db_Handler {
    constructor(dbstring = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/test/code/database/website_db.db") {
        this.db = new sqlite3.Database(dbstring)
    }

    write_table(table_object) {

        let values = Object.values(table_object);
        let keys = Object.keys(table_object);

        let query = this.db.prepare("INSERT INTO ? (?) VALUES (?)");

        this.db.run(query_string, (err) => {
            if (err) {
                throw (err)
            }
        })
    }
}

module.exports = Db_Handler