const hashing = require("../hashing");
jest.mock("bcrypt");
const bcrypt = require("bcrypt");

describe("Hashing Test", () => {
    afterEach(() => {
        bcrypt.resetParams();
    });

    test("hashPw should reject with error on bcrypt.genSalt Error", async () => {
        bcrypt.genSaltError = true;
        let result = hashing.hashPw("password");
        expect(result).rejects.toThrow("salt Error");
    });

    test("hashPw should reject with error on bcrypt.hash Error", () => {
        bcrypt.hashError = true;
        let result = hashing.hashPw("password");
        expect(result).rejects.toThrow("hash Error");
    });

    test("comparePasswords should reject with error on bcrypt.compare Error", () => {
        bcrypt.compareError = true;
        let result = hashing.comparePasswords("password", "hashedPassword");
        expect(result).rejects.toThrow("compare Error");
    });
});