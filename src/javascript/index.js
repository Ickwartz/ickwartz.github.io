const Db_Handler = require("./modules/db_handler");
const Users = require("./modules/table_classes/users");

let user = new Users("nick", "schiffke", "Nick.Schiffke@yahoo.com");
let db = new Db_Handler();

db.write_table(user)
