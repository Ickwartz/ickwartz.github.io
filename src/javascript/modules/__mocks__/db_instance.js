// const mock_db_instance = jest.createMockFromModule("../db_instance");

// mock_db_instance.serialize.mockImplementation(callback => callback());
// mock_db_instance.prepare.mockReturnValue(mock_db_instance);
// // NOTE: diese implementierung lieber in jedem test einzeln machen 
// // --> reihenfolge unabhängig
// mock_db_instance.all
//     .mockImplementationOnce((data, callback) => {
//         callback(new Error("SQL Error"));
//     })
//     .mockImplementationOnce((data, callback) => {
//         callback(null, [{data: "data"}]);
//     })
//     .mockImplementationOnce((data, callback) => {
//         callback(null, []);
//     });


// module.exports = mock_db_instance;

module.exports = {
    serialize: function(cb) {
        cb();
    },

    queryAllError: false,
    queryRunError: false,
    all: async function(data, callback) {
        if (this.queryAllError) {
            callback(new Error("all Error"));
        } 
        return callback(null, []);
    },
    run: async function(data, callback) {
        if (this.queryRunError) {
            callback(new Error("run Error"));
        } 
        let cb = callback.bind({lastID: 1});
        cb(null);
    },
    

    prepareError: false,
    prepare: function(sql, callback) {
        if (this.prepareError) {
            callback(new Error("prepare Error"));
        } else {
            return this;
        }
    },

    resetParams: function() {
        this.prepareError = false;
        this.queryAllError = false;
        this.queryRunError = false;
    }
};