const db_instance = require("./db_instance");

class Db_Functions {
    constructor() {
        this.db = db_instance;
    }

    async queryAll(sql, placeholders){
        return new Promise ((resolve, reject) => {
            this.db.serialize(() => {
                let query = this.db.prepare(sql);
                query.all(placeholders, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            });
        })
        .catch(err => {throw err;});
    }

    async runQuery(sql, data) {
        let query = this.db.prepare(sql);
        await query.run(data, function (err) {
            if (err) {
                throw err;
            }
            console.log("Query ran successfully");
        });
        return this.lastID;
    }
}

module.exports = Db_Functions;