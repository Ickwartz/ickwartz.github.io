const bcrypt = require("bcrypt");

function encryptPw(password, callback) {
    bcrypt.genSalt(12, (err, salt) => {
        if (err)
            return callback(err);
        
        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
}

async function encryptPw2(password) {
    return new Promise((res, rej) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                rej(err);
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(hash);
                    }
                });
            }
        });
    });
}

function comparePasswords(textPw, hashPw, callback) {
    bcrypt.compare(textPw, hashPw, (err, pw_matches) => {
        if (err) {
            return callback(err);
        }
        return callback(err, pw_matches);
    }) ;
}

async function comparePasswords2(textPw, hashPw) {
    return new Promise((res, rej) => {
        bcrypt.compare(textPw, hashPw, (err, pw_matches) => {
            if (err) {
                rej(err);
            } else {
                res(pw_matches);
            }
        });
    });
}

async function evalPwCompare(pw, hashPw) {
    let result = await comparePasswords2(pw, hashPw);
    console.log(result);
}

async function testEncryption() {
    console.log("expectation: first true then false");
    
    let enc_pw = await encryptPw2("123456");
    evalPwCompare("123456", enc_pw);
    
    let enc_pw2 = await encryptPw2("123456");
    evalPwCompare("1234567", enc_pw2);
}

testEncryption();