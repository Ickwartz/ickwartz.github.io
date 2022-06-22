const user_accounts = require("./modules/table_classes/user_accounts");

async function blub() {
    let ua = new user_accounts("Alfred.Yeet@test.de", "test123");
    ua.safeData()
}
blub()