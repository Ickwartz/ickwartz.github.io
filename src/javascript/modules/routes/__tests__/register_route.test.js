const app = require("../../../../app");
const request = require("supertest");

const User_Accounts = require("../../table_classes/user_accounts");
const Users = require("../../table_classes/users");
const Preregistration = require("../../table_classes/preregistration");

jest.mock("../../table_classes/preregistration");
jest.mock("../../table_classes/users");
jest.mock("../../table_classes/user_accounts");
jest.mock("@logger");

describe("post register/registrate", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("failes on missing inputs and sends correct URL param", async () => {
        await request(app).post("/register/registrate").send({
            first_name: "bla",
            surname: "etc"
        }).expect("Location", "/register?reg=incomplete");
    });

    test("failes on password missmatch and sends correct URL param", async () => {
        await request(app).post("/register/registrate").send({
            first_name: "test",
            surname: "test",
            email: "test@test.de",
            password: "123456",
            password_confirm: "654321"
        }).expect("Location", "/register?reg=pwmismatch");
    });

    test("failes when not preregistered and sends correct URL param", async () => {
        Preregistration.prototype.isPreRegistered.mockReturnValueOnce(false);
        await request(app).post("/register/registrate").send({
            first_name: "test",
            surname: "test",
            email: "test@test.de",
            password: "123456",
            password_confirm: "123456"
        }).expect("Location", "/register?reg=noprereg");
    });

    test("should redirect to root when successfull", async () => {
        Preregistration.prototype.isPreRegistered.mockReturnValueOnce(true);
        await request(app).post("/register/registrate").send({
            first_name: "test",
            surname: "test",
            email: "test@test.de",
            password: "123456",
            password_confirm: "123456"
        }).expect("Location", "/");
    });

    test("should call deletePreRegistration before registrating new user", async () => {
        Preregistration.prototype.isPreRegistered.mockReturnValueOnce(true);
        await request(app).post("/register/registrate").send({
            first_name: "test",
            surname: "test",
            email: "test@test.de",
            password: "123456",
            password_confirm: "123456"
        });
        expect(Preregistration.prototype.deletePreRegistration).toHaveBeenCalledTimes(1);
    });

    test("should call Users.safeData when every User input is correct", async () => {
        Preregistration.prototype.isPreRegistered.mockReturnValueOnce(true);
        await request(app).post("/register/registrate").send({
            first_name: "test",
            surname: "test",
            email: "test@test.de",
            password: "123456",
            password_confirm: "123456"
        });
        expect(Users.prototype.safeData).toHaveBeenCalledTimes(1);
    });

    test("should call User_Accounts.safeData before registrating new user", async () => {
        Preregistration.prototype.isPreRegistered.mockReturnValueOnce(true);
        await request(app).post("/register/registrate").send({
            first_name: "test",
            surname: "test",
            email: "test@test.de",
            password: "123456",
            password_confirm: "123456"
        });
        expect(User_Accounts.prototype.safeData).toHaveBeenCalledTimes(1);
    });
});
