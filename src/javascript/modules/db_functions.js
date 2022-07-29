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
                    }
                });
                query.all(placeholders, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                });
            });
        })
        .catch(err => {
            throw Error(`${err} || running QueryAll: ${sql} data: ${Object.keys(placeholders)} `);
        });
    }
    /*
    sql
    placeholders
    ErrorMessage
    */
    async runQuery(sql, data) {
        return new Promise ((resolve, reject) => {
            this.db.serialize(() => {
                let query = this.db.prepare(sql, function(err) {
                    if (err) {
                        reject(err);
                    }
                });
                query.run(data, function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve(this.lastID);
                });
            });
        })
        .catch(err => {
            throw Error(`${err} || running Query: ${sql} data: ${Object.keys(data)} `);
        });
    }
    /*
    async runQuery(sql, data) {
        try {
            let query = this.db.prepare(sql);
            query.run(data, function(err) {
                if (err) {
                    logger.debug(err);
                    throw err;
                }
                logger.dbLogger.info("Query ran successfully");
            });
            return this.lastID;
            
        } catch(error) {
            logger.debug("runQuery:" + error);
            throw error;
        }
    }
    */
}

module.exports = Db_Functions;