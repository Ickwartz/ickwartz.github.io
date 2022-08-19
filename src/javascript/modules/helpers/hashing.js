const bcrypt = require("bcrypt");

module.exports = {
    hashPw: async function(password) {
        return new Promise((res, rej) => {
            bcrypt.genSalt(12, (err, salt) => {
                if (err) {
                    rej(err);
                    return;
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    res(hash);
                });
            });
        });
    },

    comparePasswords: async function(textPw, hashPw) {
        return new Promise((res, rej) => {
            bcrypt.compare(textPw, hashPw, (err, pw_matches) => {
                if (err) {
                    rej(err);
                    return;
                }
                res(pw_matches);
            });
        });
    }
};
