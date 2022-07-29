const sqlite3 = require("sqlite3");
const logger = require("@logger");

let dbstring = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/src/database/website_db.db";

let db = new sqlite3.Database(dbstring);

db.on("error", function(error) {
    console.log("db instance error", error);
    logger.debug("Got an Error", error);
});

module.exports = db;
