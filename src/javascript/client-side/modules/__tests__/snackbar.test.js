import {Snackbar} from "../snackbar.js";

describe("Snackbar", () => {
    let snackbar = new Snackbar();
    jest.useFakeTimers();

    describe("addSnackbar", () => {
        snackbar.addSnackbar();
        test("adds snackbar.css to document head", () => {
            expect(document.head.querySelector('link[href$="snackbar.css"]')).toBeTruthy();
        });
        test("adds snackbar div to body", () => {
            expect(document.body.querySelector("#snackbar")).toBeTruthy();
        }); 
    });

    describe("displayOnSnackbar", () => {
        test("snackbar is shown", () => {
            snackbar.displayOnSnackbar("Test");
            let snackbarElement = document.body.querySelector("#snackbar");
            expect(snackbarElement.className).toBe("show");
        });
        test("snackbar displays the right content", () => {
            snackbar.displayOnSnackbar("Test Content");
            let snackbarElement = document.body.querySelector("#snackbar");
            expect(snackbarElement.textContent).toBe("Test Content");
        });
        test("snackbar fades after 5s", async () => {
            // after timeout to ensure previous calls are not shown anymore
            jest.advanceTimersByTime(5000);
            let snackbarElement = document.body.querySelector("#snackbar");
            snackbar.displayOnSnackbar("Test");
            jest.advanceTimersByTime(5000);
            expect(snackbarElement.className).toBe("");
        });
    });
});