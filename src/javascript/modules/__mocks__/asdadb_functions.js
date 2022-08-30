const mock_Db_Functions = jest.createMockFromModule("../db_functions");


mock_Db_Functions.mockImplementation(() => {
    const queryAll = jest.fn()
        .mockResolvedValueOnce([{data:"data"}])
        .mockResolvedValueOnce([]);
    return {
        queryAll
    };
  });

export {mock_Db_Functions};