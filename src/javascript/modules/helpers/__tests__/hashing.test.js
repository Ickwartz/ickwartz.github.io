const hashing = require("../hashing");
jest.mock("bcrypt");
const bcrypt = require("bcrypt");

describe("Hashing Test", () => {
    afterEach(() => {
        bcrypt.resetParams();
    });

    test("hashPw should reject with error on bcrypt.genSalt Error", () => {
        bcrypt.genSaltError = true;
        let result = hashing.hashPw("password");
        expect(result).rejects.toThrow("salt Error");
    });

    test("hashPw should reject with error on bcrypt.hash Error", () => {
        bcrypt.hashError = true;
        let result = hashing.hashPw("password");
        expect(result).rejects.toThrow("hash Error");
    });

    test("hashPw resolves to bcrypt.hash result", () => {
        let result = hashing.hashPw("password");
        expect(result).resolves.toBe("hashedPw");
    });

    test("comparePasswords should reject with error on bcrypt.compare Error", () => {
        bcrypt.compareError = true;
        let result = hashing.comparePasswords("password", "hashedPassword");
        expect(result).rejects.toThrow("compare Error");
    });

    test("comparePasswords resolves to true when bcrypt.compare returns true", () => {
        bcrypt.compareSuccess = true;
        let result = hashing.comparePasswords("password", "hashedPassword");
        expect(result).resolves.toBe(true);
    });

    test("comparePasswords resolves to false when bcrypt.compare returns false", () => {
        bcrypt.compareSuccess = false;
        let result = hashing.comparePasswords("password", "hashedPassword");
        expect(result).resolves.toBe(false);
    });
});