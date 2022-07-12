import {NewScheduleTableHandler} from "./modules/newScheduleTableHandler.js";

window.onload = () => {
	let tableHandler =  new NewScheduleTableHandler();

	document.getElementById("addRowButton").addEventListener("click",() => {
		tableHandler.createRow();
	});

	document.getElementById("submitButton").addEventListener("click", () => {
        tableHandler.saveTableData();
    }); 

};
