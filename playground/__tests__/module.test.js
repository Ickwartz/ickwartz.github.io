const {screen} = require("@testing-library/dom");
const createElements = require("../module.js");

describe("things being in place", () => {
    document.body.innerHTML = '<div id="container"></div>';
    createElements();

    test("elements created correctly", () => {
        expect(screen.getByText(/hello this is default text/i)).toBeTruthy();
        expect(screen.getByRole("button", {name: /click me/i})).toBeTruthy();
    });

    test("button click changes text", () => {
        const button = screen.getByRole("button", {name: /click me/i});
        button.click();
    
        expect(screen.queryByText(/hello this is default text/i)).not.toBeInTheDocument();
        expect(screen.getByText(/I changed/i)).toBeTruthy();
    });
});