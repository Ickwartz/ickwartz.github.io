const User_Account = require("../modules/table_classes/user_accounts");
const mock_db_instance = require("../modules/db_instance");

jest.mock("../modules/db_instance");


describe("user_accounts", () => {
    afterEach(jest.clearAllMocks);       // reset mocks after each test to prevent errors when adding more tests

    test("Reject promise when sql query returns error", async () => {
        let testUser = new User_Account("test@test.de", "123456");
        
        const mAll = {
            all: jest.fn().mockImplementation((data, callback) => {
                callback(new Error("SQL Error"));
            })
        };
        mock_db_instance.prepare.mockReturnValue(mAll);
        mock_db_instance.serialize.mockImplementation(callback => callback());

        //expect.assertions(1);
        try {
            await testUser.verifyUser()
        } 
        catch (err) {
            expect(err).toEqual(new Error("SQL Error"));
        }
    });

    test("Resolve promise to true when email and password match", async () => {
        let testUser = new User_Account("test@test.de", "123456");
        
        const mAll = {
            all: jest.fn().mockImplementation((data, callback) => {
                callback(null, [{email: "test@test.de", password: "123456"}]);
            })
        };
        mock_db_instance.prepare.mockReturnValue(mAll);
        mock_db_instance.serialize.mockImplementation(callback => callback());

        expect.assertions(1);
        expect(await testUser.verifyUser()).toBe(true);
    });

    test("Resolve promise to false when email and password dont match", async () => {
        let testUser = new User_Account("test@test.de", "123456");
        
        const mAll = {
            all: jest.fn().mockImplementation((data, callback) => {
                callback(null, []);
            })
        };
        mock_db_instance.prepare.mockReturnValue(mAll);
        mock_db_instance.serialize.mockImplementation(callback => callback());

        expect.assertions(1);
        expect(await testUser.verifyUser()).toBe(false);
    });
    // TODO: test für Erfolg, keine Rückgabe Daten
    // TODO: z.23 - 29 "rausziehen" (deduplizieren)
    
});
