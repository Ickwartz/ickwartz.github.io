const db_instance = require("./db_instance");

class Db_Functions {
    constructor() {
        this.db = db_instance;
    }

    async queryAll(sql, placeholders){
        return new Promise ((resolve, reject) => {
            this.db.serialize(() => {
                let query = this.db.prepare(sql, function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                });
                query.all(placeholders, (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });
        })
        .catch(err => {
            throw Error(`${err} || running QueryAll: ${sql} data: ${Object.keys(placeholders)} `);
        });
    }
    
    async runQuery(sql, data) {
        return new Promise ((resolve, reject) => {
            this.db.serialize(() => {
                let query = this.db.prepare(sql, function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                });
                query.run(data, function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log(this);
                    resolve(this.lastID);
                });
            });
        })
        .catch(err => {
            throw Error(`${err} || running Query: ${sql} data: ${Object.keys(data)} `);
        });
    }
}

module.exports = Db_Functions;