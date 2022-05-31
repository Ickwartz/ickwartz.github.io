const sqlite3 = require("sqlite3").verbose();   // verbose = sql errors are shown 

class Db_Handler {
    constructor(dbstring = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/src/database/website_db.db") {
        this.db = new sqlite3.Database(dbstring)
    }

    write_table(table_object) {

        let values = table_object.getValues();
        
        let query_string = table_object.getInsertSQL()

        let query = this.db.prepare(query_string)
        
        query.run(values, (err) => {
            if (err) {
                throw (err)
            } else {
                console.log("success")
            }
        })
    }
}

module.exports = Db_Handler