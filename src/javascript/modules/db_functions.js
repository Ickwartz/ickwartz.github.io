const db_instance = require("./db_instance");

class Db_Functions {
    constructor() {
        this.db = db_instance;
    }

    async queryAll(sql, data){
        return new Promise ((resolve, reject) => {
            this.db.serialize(() => {
                let query = this.db.prepare(sql);
                query.all(data, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            });
        })
        .catch(err => {throw err;});
    }
}

module.exports = Db_Functions;