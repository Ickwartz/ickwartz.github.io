const mock_Db_Functions = jest.createMockFromModule("../db_functions");


mock_Db_Functions.mockImplementation(() => {
    const queryAll = jest.fn()
        .mockResolvedValueOnce([{data:"data"}])
        .mockResolvedValueOnce([]);
    return {
        queryAll
    };
  });

module.exports = mock_Db_Functions;

/*






mock_Db_Functions.queryAll = jest.fn().mockImplementation((sql, data) => {
    console.log("i should run")
    return [{data: "stuff"}]
})

mock_Db_Functions.queryAll = (data) => {
    console.log("queryAll Aufruf")
    return new Promise ((resolve, reject) => {
        resolve(data)
    })
}
//mock_Db_Functions.queryAll = jest.fn().mockResolvedValue([{data: "data"}]);
    //.mockResolvedValueOnce([])

//mock_Db_Functions.queryAll.mockImplementation(jest.fn(Promise.resolve([{data: "data"}])));
//mock_Db_Functions.queryAll.mockResolvedValue(Promise.resolve([{data: "data"}]));

module.exports = mock_Db_Functions;



module.exports = class Db_Functions{
    constructor(){}
    queryAll = jest.fn()
        .mockResolvedValueOnce([{data:"data"}])
        .mockResolvedValueOnce([])
}
*/