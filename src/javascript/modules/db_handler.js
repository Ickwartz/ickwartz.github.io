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

    read_table(table) {
        this.db.serialize(() => {
            let query_string = "SELECT * FROM " + table;
            //let query = this.db.prepare(query_string);

            this.db.all(query_string, (err, rows) => {
                if (err) {
                    throw(err)
                } else {
                    console.log(rows);
                    //callback(rows);
                }
            })
        })
    }
}

module.exports = Db_Handler