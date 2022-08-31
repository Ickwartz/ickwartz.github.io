/*
0 = 48
9 = 57

A = 65
Z = 90

a = 97
z = 122
*/
function randomInt(start, end) {
    let range = end - start + 1;
    return Math.floor((Math.random() * range)+ start);
}
function randomCodeGenerator(length) {
    let code = "";
    for (let i = 0; i < length; i++) {
        let first = Math.floor(Math.random() * 3);
        switch (first) {
            case 0: {
                code += String.fromCharCode(randomInt(48, 57)); // 0 - 9
                break;
            }
            case 1: {
                code += String.fromCharCode(randomInt(65, 90)); // a - z
                break;
            }
            case 2: {
                code += String.fromCharCode(randomInt(97, 122)); // A - Z
                break;
            }
        }
    }
    return code;
}

function generateResetURL() {
    let baseUrl = "https://website.de/pwreset?code="
    let code = randomCodeGenerator(40);
    return baseUrl + code;
}

console.log(generateResetURL());