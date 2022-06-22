const User_Account = require("../src/javascript/modules/table_classes/user_accounts");

jest.mock("../src/javascript/modules/db_functions");

//, () => require("../src/javascript/modules/__mocks__/db_functions")

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
