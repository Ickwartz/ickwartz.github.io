const app = require("../../../../app");
const request = require("supertest");

jest.mock("../../table_classes/preregistration");
jest.mock("../../table_classes/users");
jest.mock("../../table_classes/user_accounts");

describe("post register/registrate", () => {
    test("failes on missing inputs", async () => {
        await request(app).post("/register/registrate").send({
            first_name: "bla",
            surname: "etc"
        }).expect("Location", "/register?reg=incomplete");
    });
});