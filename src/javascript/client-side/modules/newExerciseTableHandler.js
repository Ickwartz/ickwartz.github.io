import {Fetch_api} from "./fetch_api.js";

class NewExerciseTableHandler  {
	constructor(){}

	fetch_api = new Fetch_api();
	rows = 0;

	tableBody = document.getElementById("input_body");

	createRow() {
		// Create Rows like this to keep values when adding new Rows
		this.rows++;
		const tr = document.createElement("tr");

		let td_index = document.createElement("td");
		td_index.innerHTML = this.rows;

		let td_name = document.createElement("td");
		let ti_name = document.createElement("input");
		ti_name.setAttribute("id", `exInp${this.rows}`);
		ti_name.setAttribute("type", "text");
		ti_name.setAttribute("placeholder", "Übung");
		ti_name.setAttribute("class", "table-input");
		td_name.appendChild(ti_name);

		let td_description = document.createElement("td");
		let ti_description = document.createElement("textarea");
		ti_description.setAttribute("id", `descInp${this.rows}`);
		ti_description.setAttribute("style", "width: 100%");
		ti_description.setAttribute("placeholder", "Beschreibung");
		ti_description.setAttribute("class", "table-input");
		td_description.appendChild(ti_description);

		tr.appendChild(td_index);
		tr.appendChild(td_name);
		tr.appendChild(td_description);

		this.tableBody.appendChild(tr);
	}


	getTableData() {
		let data = [];
		for (let i = 1; i <= this.rows; i++) {
			let exercise = document.getElementById(`exInp${i}`);
			let description = document.getElementById(`descInp${i}`);
			if (exercise != "") {
				data.push({name: exercise.value, description: description.value});
			}
		}
		return(data);
	}

	async saveTableData() {
		this.fetch_api.postData("/newexercise/save", this.getTableData()).then(result => {
			this.showResultMessage(result);
		});
	}

	showResultMessage(resultArr) {
		let success = false;
		let text = "";

		resultArr.forEach(element => {
			if (element.result && !success) {
				success = true;
				text = "Erfolgreich in der Datenbank gespeichert!" + text;
			} else if (!element.result) {
				text += "<br>" + element.message;
			}
		});
		this.displayOnSnackbar(text);
	}

	displayOnSnackbar(text) {
		// Show fading popup message on bottom of screen
		const snackbar = document.getElementById("snackbar");
		const snackbarContent = document.getElementById("snackbar-content");
		snackbarContent.innerHTML = text;
		snackbar.className = "show";
		// make it fade after 5s
		setTimeout(() => {snackbar.className = "";}, 5000);
	}
}

export {NewExerciseTableHandler};