const {screen} = require("@testing-library/dom");
import {createElements} from "../module.mjs";

test("things being in place", () => {
    let dom = document.body.innerHTML = '<div id="container"></div>';

    createElements();

    expect(screen.getByText(/hello this is default text/i)).toBeTruthy();

    const button = dom.getByRole("button", {name: /click me/i});
    button.click();

    expect(dom.getByText(/hello this is default text/i)).toBeFalsy();
    expect(dom.getByText(/I changed/i)).toBeTruthy();
});