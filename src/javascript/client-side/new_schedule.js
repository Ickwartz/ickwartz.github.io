import {Fetch_api} from "./modules/fetch_api.js";

class NewScheduleTableHandler  {
	constructor(){}

	fetch_api = new Fetch_api();
	rows = 0;

	tableBody = document.getElementById("input_body");

	createRow() {
		// Create Rows like this to keep values when adding new Rows
		this.rows++;
		const tr = document.createElement("tr");

		let td_user = document.createElement("td");
		let ti_user = document.createElement("input");
		ti_user.setAttribute("id", `userInp${this.rows}`);
		ti_user.setAttribute("type", "text");
		ti_user.setAttribute("placeholder", "User");
		ti_user.setAttribute("class", "table-input");
		td_user.appendChild(ti_user);

        let td_exercise = document.createElement("td");
		let ti_exercise = document.createElement("input");
		ti_exercise.setAttribute("id", `exerciseInp${this.rows}`);
		ti_exercise.setAttribute("type", "text");
		ti_exercise.setAttribute("placeholder", "Übung");
		ti_exercise.setAttribute("class", "table-input");
		td_exercise.appendChild(ti_exercise);

        let td_reps = document.createElement("td");
		let ti_reps = document.createElement("input");
		ti_reps.setAttribute("id", `repsInp${this.rows}`);
		ti_reps.setAttribute("type", "text");
		ti_reps.setAttribute("placeholder", "Reps");
		ti_reps.setAttribute("class", "table-input");
		td_reps.appendChild(ti_reps);

        let td_sets = document.createElement("td");
		let ti_sets = document.createElement("input");
		ti_sets.setAttribute("id", `setsInp${this.rows}`);
		ti_sets.setAttribute("type", "text");
		ti_sets.setAttribute("placeholder", "Sets");
		ti_sets.setAttribute("class", "table-input");
		td_sets.appendChild(ti_sets);

		let td_description = document.createElement("td");
		let ti_description = document.createElement("textarea");
		ti_description.setAttribute("id", `descInp${this.rows}`);
		ti_description.setAttribute("style", "width: 100%");
		ti_description.setAttribute("placeholder", "Beschreibung");
		ti_description.setAttribute("class", "table-input");
		td_description.appendChild(ti_description);

        let td_date = document.createElement("td");
		let ti_date = document.createElement("input");
		ti_date.setAttribute("id", `dateInp${this.rows}`);
		ti_date.setAttribute("type", "text");
		ti_date.setAttribute("placeholder", "User");
		ti_date.setAttribute("class", "table-input");
		td_date.appendChild(ti_date);

        tr.appendChild(td_user);
		tr.appendChild(td_exercise);
		tr.appendChild(td_reps);
		tr.appendChild(td_sets);
		tr.appendChild(td_description);
		tr.appendChild(td_date);

		this.tableBody.appendChild(tr);
	}
}

window.onload = () => {
	let tableHandler =  new NewScheduleTableHandler();

	document.getElementById("addRowButton").addEventListener("click",() => {
		tableHandler.createRow();
	});

	document.getElementById("submitButton").addEventListener("click", () => {}); //(tableHandler.saveTableData()));

};
