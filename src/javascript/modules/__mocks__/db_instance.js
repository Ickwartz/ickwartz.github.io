
const mock_db_instance = jest.createMockFromModule("../db_instance")

/*let tryout = mock_db_instance.function().mockReturnValueOnce(new Error("SQL Error"))
    .mockReturnValueOnce(null, [{email: "bla", password:"blub"}])
    .mockReturnValueOnce(null, []);
const mAll = {
    all: jest.fn().mockImplementation((data, callback) => {
        callback(tryout)
    })
};*/

mock_db_instance.serialize.mockImplementation(callback => callback());
mock_db_instance.prepare.mockReturnValue(mock_db_instance);
mock_db_instance.all
    .mockImplementationOnce((data, callback) => {
        callback(new Error("SQL Error"));
    })
    .mockImplementationOnce((data, callback) => {
        callback(null, [{email: "bla", password:"blub"}]);
    })
    .mockImplementationOnce((data, callback) => {
        callback(null, []);
    })


module.exports = mock_db_instance