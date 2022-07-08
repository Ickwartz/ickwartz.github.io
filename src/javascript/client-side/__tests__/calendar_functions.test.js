import {CalendarFunctions} from "../modules/calendar_functions";
require("../modules/calendarWebComponents");

//jest.mock("../modules/backendCommunication");

describe("CalendarFunctions", () => {
    document.body.innerHTML = "<schedule-calendar></schedule-calendar>";

    test("Dom Tree built successfully", () => {
        expect(document.getElementById("monthAndYear")).toBeTruthy();
    });
});


/* NOTES

- babel
- import zurück

- Mock web component functions -> dont exec.
- monitor calls

*/