const User_Account = require("../modules/table_classes/user_accounts");
const mock_db_instance = require("../modules/db_instance");

jest.mock("../modules/db_instance");


describe("user_accounts", () => {
    afterEach(jest.clearAllMocks);       // reset mocks after each test to prevent errors when adding more tests

    test("Reject Promise when sql query returns error", async () => {
        let testUser = new User_Account("test@test.de", "123456");
        
        const mAll = {
            all: jest.fn().mockImplementation((data, callback) => {
                callback(new Error("Error"));
            })
        };
        mock_db_instance.prepare.mockReturnValue(mAll);
        mock_db_instance.serialize.mockImplementation(callback => callback());

        expect.assertions(1);
        expect(await testUser.verifyUser()).toReject();
    });
    // TODO: test für Erfolg, keine Rückgabe Daten
    // TODO: z.23 - 29 "rausziehen" (deduplizieren)
    
});
