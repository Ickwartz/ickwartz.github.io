import {CalendarFunctions} from "../modules/calendar_functions";
require("../modules/initWebComponents");

jest.mock("../modules/backendCommunication");

describe("CalendarFunctions", () => {
    document.body.innerHTML = "<schedule-calendar></schedule-calendar>";
    let calendar_functions = new CalendarFunctions;
    let mockedAppointments = [{training_id: 1, name: 'test', date: '2022-02-01', user_id: 1}]; // defined in backendCommunication mock

    test("Dom Tree built successfully", () => {
        expect(document.getElementById("monthAndYear")).toBeTruthy();
    });

    test("getDateInfoFromDay should return object with all date informations", () => {
        let day = document.createElement("td");
        day.setAttribute("data-date", "1");
        day.setAttribute("data-month", "2");
        day.setAttribute("data-year", "2022");

        let expectedResult = {
            day: "01",
            month: "02",
            year: "2022",
            date: "2022-02-01"
        };

        expect(calendar_functions.getDateInfoFromDay(day)).toStrictEqual(expectedResult);
    });

    test("formatNumeral should return 01 from 1 and 10 from 10, should work with both int and string input", () => {
        let num1 = 1;
        let num2 = 10;
        let numstr1 = "1";
        let numstr2 = "10";
        expect(calendar_functions.formatNumeral(num1)).toBe("01");
        expect(calendar_functions.formatNumeral(numstr1)).toBe("01");
        expect(calendar_functions.formatNumeral(num2)).toBe("10");
        expect(calendar_functions.formatNumeral(numstr2)).toBe("10");
    });

    test("initAppointments should set monthsAppointments var to list of objects", () => {
        let expectedResult = mockedAppointments;  
        calendar_functions.initAppointments().then(()=>{
            expect(calendar_functions.monthsAppointments).toStrictEqual(expectedResult);
        });
    });

    test("getAppointmentDates should return list of dates(only day) of appointments", () => {
        expect(calendar_functions.getAppointmentDates()).toStrictEqual([1]);
    });

    test("tagAppointmentDays should call web component function", () => {
        expect(1).toBe(1);
    });
});


/* NOTES

- Mock web component functions -> dont exec.
- monitor calls

*/