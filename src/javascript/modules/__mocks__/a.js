const mock_Db_Functions = jest.createMockFromModule("../db_functions");

/*
mock_Db_Functions.queryAll = (data) => {
    console.log("queryAll Aufruf")
    return new Promise ((resolve, reject) => {
        resolve(data)
    })
}
*/

//mock_Db_Functions.queryAll = jest.fn().mockResolvedValue([{data: "data"}]);
    //.mockResolvedValueOnce([])

mock_Db_Functions.queryAll = jest.fn().mockImplementation((sql, data) => {
    console.log("i should run")
    return [{data: "stuff"}]
})

module.exports = mock_Db_Functions;