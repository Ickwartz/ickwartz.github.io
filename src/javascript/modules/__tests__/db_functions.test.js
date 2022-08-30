const Db_Functions = require("../db_functions");
const db_instance = require("../db_instance");

jest.mock("../db_instance");

describe("Db_Functions", () => {
    afterEach(() => {
        db_instance.resetParams();
    });
    let db_functions = new Db_Functions();

    test("queryAll throws Error when db.prepare returns error", async () => {
        db_instance.prepareError = true;
        let params = {key: "value"};
        await expect(db_functions.queryAll("sql", params)).rejects.toThrow(/prepare Error/);
    });

    test("queryAll throws Error when query.all returns error", async () => {
        db_instance.queryAllError = true;
        let params = {key: "value"};
        await expect(db_functions.queryAll("sql", params)).rejects.toThrow(/all Error/);
    });

    test("queryAll resolves when no errors are returned", async () => {
        let params = {key: "value"};
        await expect(db_functions.queryAll("sql", params)).resolves.toBeTruthy();
    });

    test("runQuery throws Error when db.prepare returns error", async () => {
        db_instance.prepareError = true;
        let params = {key: "value"};
        await expect(db_functions.runQuery("sql", params)).rejects.toThrow(/prepare Error/);
    });

    test("runQuery throws Error when query.run returns error", async () => {
        db_instance.queryRunError = true;
        let params = {key: "value"};
        await expect(db_functions.runQuery("sql", params)).rejects.toThrow(/run Error/);
    });

    test("runQuery resolves when no errors are returned", async () => {
        let params = {key: "value"};
        await expect(db_functions.runQuery("sql", params)).resolves.toBeTruthy();
    });
});