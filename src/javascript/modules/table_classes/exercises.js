const Table_functions = require("../table_functions");
const db_instance = require("../db_instance");

class Exercises extends Table_functions{
    constructor(name, description) {
        super();
        this.name = name;
        this.description = description;
    }

    db = db_instance;
    // # = private
    #insertSQL = `
    INSERT INTO exercises (name, description)
    VALUES (?,?)
    ;`;

    #readSQL = "SELECT * FROM exercises;";

    write_table() {
        //let values = this.getValues();
        let values = [this.name, this.description];

        let query = this.db.prepare(this.#insertSQL)
        
        query.run(values, (err) => {
            if (err) {
                throw (err);
            } else {
                console.log("success");
            }
        });
    }
    
    async read_table() {
        //let query = this.db.prepare(this.#readSQL)

        let query = new Promise ((resolve, reject) => {
            this.db.all(this.#readSQL, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })
        .then(result => {return result})
        .catch(err => {throw err});            

        let data = await query;
        return data
    }
}

module.exports = Exercises