const User_Account = require("../user_accounts");
const db_functions = require("../../db_functions");
const hashing = require("../../helpers/hashing");

jest.mock("../../db_functions");
// jest.mock("../../helpers/hashing");

hashing.comparePasswords = jest.fn();

describe("user_accounts", () => {
    afterEach(() => jest.clearAllMocks());

    let testUser = new User_Account();
    describe("verifyUser", () => {
        test("return false when queryAll returns empty array", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce([]);
            expect(await testUser.verifyUser()).toBe(false);
        });
        test("return false when queryAll returns smth but comparePasswords returns false", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce(["foo"]);
            hashing.comparePasswords.mockReturnValueOnce(false);
            expect(await testUser.verifyUser()).toBe(false);
        });
        test("return true when queryAll returns smth and comparePasswords returns true", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce(["foo"]);
            hashing.comparePasswords.mockReturnValueOnce(true);
            expect(await testUser.verifyUser()).toBe(true);
        });
    });

    describe("isAdmin", () => {
        test("return false when queryAll returns empty array", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce([]);
            expect(await testUser.isAdmin()).toBe(false);
        });
        test("return false when queryAll returns array with at least one value", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce(["foo"]);
            expect(await testUser.isAdmin()).toBe(true);
        });
    });

    describe("isRegistered", () => {
        test("return false when queryAll returns empty array", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce([]);
            expect(await testUser.isRegistered()).toBe(false);
        });
        test("return false when queryAll returns array with at least one value", async () => {
            db_functions.prototype.queryAll.mockReturnValueOnce(["foo"]);
            expect(await testUser.isRegistered()).toBe(true);
        });
    });

    describe("safeData", () => {
        test("runs runQuery", async () => {
            testUser.safeData();
            await expect(db_functions.prototype.runQuery).toHaveBeenCalledTimes(1);
        });
    });

    describe("readData", () => {
        test("runs queryAll", async () => {
            testUser.readData();
            await expect(db_functions.prototype.queryAll).toHaveBeenCalledTimes(1);
        });
    });
});
