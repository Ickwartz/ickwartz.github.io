const hashing = require("./modules/helpers/hashing");

let hashPw = "$2b$12$MEU.iTSnIBKdkgvDC4iyKOfZ2Xhwdsw1pfunnLU9L7D4gpTQIMIhO";
let textPW = "nick123";

hashing.comparePasswords(textPW, hashPw).then(res => console.log(res));