const User = require("./modules/table_classes/users");

async function getUserID(user) {
    let response = await user.getUserIDFromName();
    if (response.length > 0) {    
        return response[0].user_id;
    } else return null;
}

async function blub() {

    let user = new User("Nick", "Schiffke");
    let response = await getUserID(user);
    if (!response) {
        console.log("Succ");
    } else {
        console.log("SSSSSSSSUCCC");
    }
}

blub();