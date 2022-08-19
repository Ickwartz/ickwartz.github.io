const User_Account = require("../user_accounts");

jest.mock("../../db_functions");

describe("user_accounts", () => {
    afterEach(() => jest.clearAllMocks());       // reset mocks after each test to prevent errors when adding more tests

    let testUser = new User_Account();
    test("Resolve to true when queryAll returns data", async () => {
        expect(await testUser.verifyUser()).toBe(true);
    });
    
    test("Resolve to false when queryAll returns no data", async () => {
        expect(await testUser.verifyUser()).toBe(false);
    });

});
