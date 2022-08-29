const Db_Functions = require("../db_functions");

jest.mock("../db_instance");

describe("Db_Functions", () => {
    afterEach(() => jest.clearAllMocks());
    let db_functions = new Db_Functions();

    test("Reject promise when sql query returns error", async () => {
        try {
            await db_functions.queryAll();
        } 
        catch (err) {
            expect(err).toEqual(new Error("SQL Error"));
        }
    });

    test("Promise should resolve with data when query is successfull", async () => {
        expect(await db_functions.queryAll()).toEqual([{data: "data"}]);
    });

    test("Promise should resolve with empty data when query returns no matches", async () => {
        expect(await db_functions.queryAll()).toEqual([]);
    });
});