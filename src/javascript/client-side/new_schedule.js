import {NewScheduleTableHandler} from "./modules/newScheduleTableHandler.js";
import {newModal} from "./webComponents/newModal.js";
let tableHandler =  new NewScheduleTableHandler();


window.onload = async () => {
	window.customElements.define("loading-modal", newModal);
	tableHandler.createModal();
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