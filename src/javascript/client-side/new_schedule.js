import {NewScheduleTableHandler} from "./modules/newScheduleTableHandler.js";
let tableHandler =  new NewScheduleTableHandler();


window.onload = async () => {

	document.getElementById("addRowButton").addEventListener("click",() => {
		tableHandler.createRow();
	});
	document.getElementById("submitButton").addEventListener("click", () => {
        tableHandler.saveTableData();
    });
	document.getElementById("button-refresh-available-exercises").addEventListener("click", () => {
		tableHandler.getAvailableExercises("Übungen aktualisiert");
	});

	tableHandler.getAvailableExercises();

	tableHandler.applyKeyListeners();
	let tbody = document.getElementById("input_body");
	const observer = new MutationObserver(async () => {
		tableHandler.applyKeyListeners();
    });
    observer.observe(tbody, {childList: true});
};