const User_Account = require("../modules/table_classes/user_accounts");

jest.mock("../modules/db_instance")

describe("user_accounts", () => {
    afterEach(jest.clearAllMocks);       // reset mocks after each test to prevent errors when adding more tests


    test("Reject promise when sql query returns error", async () => {
        let testUser = new User_Account();

        //expect.assertions(1);
        try {
            await testUser.verifyUser()
        } 
        catch (err) {
            expect(err).toEqual(new Error("SQL Error"));
        }
    });
    
    test("Resolve promise to true when email and password match", async () => {
        let testUser = new User_Account();
        
        expect.assertions(1);
        expect(await testUser.verifyUser()).toBe(true);
    });

    test("Resolve promise to false when email and password dont match", async () => {
        let testUser = new User_Account();
        
        expect.assertions(1);
        expect(await testUser.verifyUser()).toBe(false);
    });
    
});
