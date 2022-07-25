import {NewExerciseTableHandler} from "./modules/newExerciseTableHandler.js";

window.onload = () => {
	let tableHandler =  new NewExerciseTableHandler();

	tableHandler.applyEventListeners();

	let tbody = document.getElementById("input_body");
	const observer = new MutationObserver(async () => {
		tableHandler.applyKeyListeners();
    });
    observer.observe(tbody, {childList: true});
};
