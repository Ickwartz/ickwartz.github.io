import {NewScheduleTableHandler} from "./modules/newScheduleTableHandler.js";
let tableHandler =  new NewScheduleTableHandler();


window.onload = async () => {
	tableHandler.getAvailableExercises();
	tableHandler.getAvailableUsers();

	tableHandler.addButtonEventListeners();
	tableHandler.applyKeyListeners();
	tableHandler.snackbar.addSnackbar();
	let tbody = document.getElementById("input_body");
	const observer = new MutationObserver(async () => {
		tableHandler.applyKeyListeners();
    });
    observer.observe(tbody, {childList: true});
};