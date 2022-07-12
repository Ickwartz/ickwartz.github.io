import {NewExerciseTableHandler} from "./modules/newExerciseTableHandler.js";

window.onload = () => {
	let tableHandler =  new NewExerciseTableHandler();

	document.getElementById("addRowButton").addEventListener("click",() => {
		tableHandler.createRow();
	});

	document.getElementById("submitButton").addEventListener("click", () => (tableHandler.saveTableData()));

};
