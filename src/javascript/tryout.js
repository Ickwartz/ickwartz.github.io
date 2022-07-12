const User = require("./modules//table_classes/users");

let user = new User("NiCk  ", "scHiffke", "Nick.Schiffke@yahoo.com");

console.log(user.first_name + "-" + user.surname + "-" + user.email);
