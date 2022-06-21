const Db_Functions = require("../src/javascript/modules/db_functions");

jest.mock("../src/javascript/modules/db_instance");

describe("Db_Functions", () => {
    afterEach(() => jest.clearAllMocks());

    test("Reject promise when sql query returns error", async () => {
        let db_functions = new Db_Functions();

        try {
            await db_functions.QueryAll();
        } 
        catch (err) {
            expect(err).toEqual(new Error("SQL Error"));
        }
    });

    test("Should resolve promise with data when query is successfull", async () => {
        let db_functions = new Db_Functions();

        expect(await db_functions.QueryAll()).toEqual([{data: "data"}])
    });

});