const mock_db_instance = jest.createMockFromModule("../db_instance")

mock_db_instance.serialize.mockImplementation(callback => callback());
mock_db_instance.prepare.mockReturnValue(mock_db_instance);
// NOTE: diese implementierung lieber in jedem test einzeln machen 
// --> reihenfolge unabhängig
mock_db_instance.all
    .mockImplementationOnce((data, callback) => {
        console.log("Callback Log")
        callback(new Error("SQL Error"));
    })
    .mockImplementationOnce((data, callback) => {
        callback(null, [{data: "data"}]);
    })
    .mockImplementationOnce((data, callback) => {
        callback(null, []);
    })


module.exports = mock_db_instance