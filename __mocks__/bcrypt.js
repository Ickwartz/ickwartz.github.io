module.exports = {
    genSaltError: false,
    genSalt : async function(x, callback)  {
        if (this.genSaltError) {
            let err = new Error("mocked salt Error");
            callback(err);
        }
        let mock_salt = "abcds";
        callback(null, mock_salt);
    },

    hashError: false,
    hash: async function(pw, salt, callback) {
        if (this.hashError) {
            let err = new Error("mocked hash Error");
            callback(err, null);
        }
        callback(null, "hashedPw");
    },

    compareError: false,
    compareSuccess: true,
    compare: async function(textPw, hashedPw, callback) {
        if (this.compareError) {
            let err = new Error("mock compare Error");
            callback(err, null);
        }
        callback(null, this.compareSuccess);
    },

    resetParams : function() {
        this.genSaltError = false;
        this.hashError = false;
        this.compareError = false;
        this.compareSuccess = true;
    }
};



// mock_bcrypt.genSalt = genSalt;
// mock_bcrypt.hash
// mock_bcrypt.compare