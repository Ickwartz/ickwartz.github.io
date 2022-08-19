const hashing = require("./modules/helpers/hashing");

let testPw = "123";

async function a () {
    console.log(await hashing.hashPw(testPw));
}
a();