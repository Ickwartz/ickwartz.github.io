const sqlite3 = require("sqlite3");

let dbstring = "C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/WebsiteErika2/src/database/website_db.db";

let db = new sqlite3.Database(dbstring);

module.exports = db;
