const user_accounts = require("./modules/table_classes/user_accounts");

async function blub() {
    let ua = new user_accounts("test@test.de", "123456");
    console.log(await ua.readData())
}
blub()