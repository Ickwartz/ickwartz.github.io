const exercises = require("./modules/table_classes/exercises");

const functions = {
    add: (x,y) => x+y,
    createUser: () => {
        const user = {
            name: "Nick",
            age: 24
        }
        return user;
    }

}


module.exports = functions;
