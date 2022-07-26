import {Fetch_api} from "./fetch_api.js";
import {Snackbar} from "./snackbar.js";

class NewExerciseTableHandler  {
	constructor(){}

	fetch_api = new Fetch_api();
	snackbar = new Snackbar();

	tableBody = document.getElementById("input_body");

	createRow() {
		const tr = document.createElement("tr");

		let td_name = document.createElement("td");
		let ti_name = document.createElement("input");
		ti_name.setAttribute("type", "text");
		ti_name.setAttribute("placeholder", "Übung");
		ti_name.setAttribute("class", "table-input exercise-input");
		td_name.appendChild(ti_name);

		let td_description = document.createElement("td");
		let ti_description = document.createElement("textarea");
		ti_description.setAttribute("style", "width: 100%");
		ti_description.setAttribute("placeholder", "Beschreibung");
		ti_description.setAttribute("class", "table-input description-input");
		td_description.appendChild(ti_description);

		let td_delete = document.createElement("td");
		td_delete.setAttribute("style", "text-align: center");
		let b_delete = document.createElement("button");
		b_delete.setAttribute("type", "button");
		b_delete.setAttribute("class", "btn button-delete");
		b_delete.addEventListener("click", (e) => {
			this.deleteTableRow(e.target);
		});
		td_delete.appendChild(b_delete);

		tr.appendChild(td_name);
		tr.appendChild(td_description);
		tr.appendChild(td_delete);

		this.tableBody.appendChild(tr);
	}

	deleteTableRow(triggerButton) {
		let parentRow = triggerButton.closest("tr");
		let table = document.getElementById("input_table");
		let tableRows = Array.prototype.slice.call(table.rows);
		let index = tableRows.indexOf(parentRow);
		table.deleteRow(index);
	}

	getTableData() {
		let exerciseData = []; 
			let rows = document.getElementsByTagName("tr");
			for (let row of rows) {
				//th is treated as tr too
				let th = row.getElementsByTagName("th");
				if (th.length > 0) {
					continue;
				}
				let exerciseName = row.getElementsByClassName("exercise-input")[0].value;
				if (exerciseName == "") {
					alert("Bitte alle Felder für Übungsnamen ausfüllen!");
					return null;
				}
				let description = row.getElementsByClassName("description-input")[0].value;
				exerciseData.push({
					name: exerciseName,
					description
				});
			}
			exerciseData.exerciseData = exerciseData;
            return exerciseData;
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
		this.snackbar.displayOnSnackbar(text);
	}

	applyEventListeners() {
		document.getElementById("addRowButton").addEventListener("click",() => {
			this.createRow();
		});

		document.getElementById("submitButton").addEventListener("click", () => (this.saveTableData()));
		this.applyKeyListeners();

	}

	applyKeyListeners() {
		// Key Listeners for tab on Enter key press and new row on Enter for last fields
		let inputs = document.querySelectorAll("input, textarea");
		let nodes = Array.prototype.slice.call(inputs);
		for (let element of inputs) {
			let index = nodes.indexOf(element);
			
			if (element.getAttribute("data-event-click") === "true") {
				continue;
			} 
			else if (element.tagName === "INPUT") {
				element.setAttribute("data-event-click", "true");
				element.addEventListener("keypress", (e) => {
					if (e.key === "Enter") {
						inputs[index+1] ? inputs[index+1].focus() : inputs[index].focus();
					}
				});
			} 
			else {
				element.setAttribute("data-event-click", "true");
				element.addEventListener("keypress", (e) => {
					if (e.key === "Enter") {
						if (!e.shiftKey) {
							if (!element[index+1]) {
								this.createRow();
							}
							inputs = document.querySelectorAll("input, textarea");
							nodes = Array.prototype.slice.call(inputs);
							inputs[index+1].focus();
						}
					}
				});
			}
		}
	}
}

export {NewExerciseTableHandler};