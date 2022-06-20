/*const functions = require("./tryout");
const Exercise = require("./modules/table_classes/exercises");

test("Add 2 + 2 to equal 4", () => {
    expect(functions.add(2,2)).toBe(4);
});

test("User should be Nick, 24 Jahre alt", () => {
    expect(functions.createUser()).toEqual({name: "Nick",age: 24});
});

test("There is no i in team", () => {
    expect("team").not.toMatch(/i/);
});

//async test with promise
test("First Exercise from table should be situp", () => {
    let ex = new Exercise();
    expect.assertions(1);
    return ex.read_table().then(data => {
        expect(data[0].name).toEqual("situp");
    });
});
//async test with async-await
test("second Exercise from table should be push up", async () => {
    let ex = new Exercise();
    expect.assertions(1);
    let data = await ex.read_table();
    expect(data[1].name).toEqual("push up");
});
*/