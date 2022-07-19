import {Fetch_api} from "./fetch_api.js";

class NewScheduleTableHandler  {
	constructor(){}

	fetch_api = new Fetch_api();
	availableExercises = [];

	tableBody = document.getElementById("input_body");

	createRow() {
		const tr = document.createElement("tr");

        let td_exercise = document.createElement("td");
		let ti_exercise = document.createElement("input");
		ti_exercise.setAttribute("type", "text");
		ti_exercise.setAttribute("placeholder", "Übung");
		ti_exercise.setAttribute("list", "availableExercises");
		ti_exercise.setAttribute("class", "table-input exercise-input");
		td_exercise.appendChild(ti_exercise);

        let td_reps = document.createElement("td");
		let ti_reps = document.createElement("input");
		ti_reps.setAttribute("type", "text");
		ti_reps.setAttribute("placeholder", "Reps");
		ti_reps.setAttribute("class", "table-input reps-input");
		td_reps.appendChild(ti_reps);

        let td_sets = document.createElement("td");
		let ti_sets = document.createElement("input");
		ti_sets.setAttribute("type", "text");
		ti_sets.setAttribute("placeholder", "Sets");
		ti_sets.setAttribute("class", "table-input sets-input");
		td_sets.appendChild(ti_sets);

		let td_description = document.createElement("td");
		let ti_description = document.createElement("textarea");
		ti_description.setAttribute("style", "width: 100%");
		ti_description.setAttribute("placeholder", "Beschreibung");
		ti_description.setAttribute("class", "table-input comment-input");
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

		tr.appendChild(td_exercise);
		tr.appendChild(td_reps);
		tr.appendChild(td_sets);
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
        
        let user = document.getElementById("user-input").value;
        let date_val = document.getElementById("date-input").value;
        let trainingName = document.getElementById("training-name-input").value;
        if (user == "" || date_val == "" || trainingName == "") {
            alert("Bitte User, Datum und Namen des Trainings angeben");
        } else {    
            let data = {};
            let dateObj = new Date(date_val);
            let date = dateObj.toISOString().split('T')[0]; // yyyy-mm-dd

			data.user = user;
			data.date = date;
			data.trainingName = trainingName;
			let exerciseData = []; 
			let rows = document.getElementsByTagName("tr");
			for (let row of rows) {
				//th is treated as tr too
				if (row.firstChild.tagName == "TH") {
					continue;
				}
				let exercise = row.getElementsByClassName("exercise-input")[0].value;
				if (exercise == "") {
					alert("Bitte alle Felder für Übungsnamen ausfüllen!");
					return null;
				}
				let exercise_id = this.getExerciseId(exercise); 
				if (!(exercise_id)) {
					alert(`Die Übung ${exercise} existiert nicht in der Datenbank, stelle bitte sicher das sie richtig geschrieben ist oder füge den Eintrag hinzu und aktualisiere die Übungen.`);
					return null;
				}
				let reps = row.getElementsByClassName("reps-input")[0].value;
				reps == "" ? reps = 0 : reps;
				let sets = row.getElementsByClassName("sets-input")[0].value;
				sets == "" ? sets = 0 : sets;
				let comment = row.getElementsByClassName("comment-input")[0].value;
				exerciseData.push({
					exercise_id,
					reps,
					sets,
					comment
				});
			}
			data.exerciseData = exerciseData;
            return data;
        }
    }
    
	async saveTableData() {
		let tableData = this.getTableData();
		if (tableData) {
			this.fetch_api.postData("/newschedule/save", tableData).then(result => {
				this.showResultMessage(result);
			});
		}
	}

	getExerciseId(exerciseName) {
		for (let exercise of this.availableExercises) {
			if (exercise.name === exerciseName) {
				return exercise.exercise_id;
			}
		}
		return null;
	}

	getExerciseName(id) {
		for (let exercise of this.availableExercises) {
			if (id === exercise.exercise_id) {
				return exercise.name;
			}
		}
	}

	async loadScheduleOptions() {
		// test with 19.07.2022
		let user_val = document.getElementById("loading-user-input").value;
		let first_name = user_val.split(" ")[0];
		let surname = user_val.split(" ")[1];

		let date_val = document.getElementById("loading-date-input").value;
		if (!(first_name && surname && date_val)) {
			alert("Vorname, Nachname und Datum benötigt");
			return null;
		}

		let dateObj = new Date(date_val);
		let date = dateObj.toISOString().split('T')[0];

		let data = {first_name, surname, date};
		await this.fetch_api.postData("/newschedule/getschedules", data).then(result => {
			let modalBody = document.getElementsByClassName("modal-body")[0];
			let heading = document.createElement("h6");
			heading.textContent = `Trainings von ${user_val} am ${date_val}: `;
			let list = this.createScheduleOptionsList(result);
			modalBody.innerHTML="";
			modalBody.appendChild(heading);
			modalBody.appendChild(list);
		});
	}

	createScheduleOptionsList(scheduleOptions) {
		let list = document.createElement("ul");
		list.setAttribute("class", "list-group");
		for (let schedule of scheduleOptions) {
			let listItem = document.createElement("li");
			listItem.setAttribute("class", "list-group-item");
			let scheduleLink = document.createElement("a");
			scheduleLink.textContent = schedule.name;
			scheduleLink.href = "#";
			scheduleLink.addEventListener("click", () => {
				this.loadSchedule(schedule.training_id);
			});
			scheduleLink.style = "text-decoration: none; color: black;";
			listItem.appendChild(scheduleLink);
			list.appendChild(listItem);
		}
		return list;
	}

	async loadSchedule(training_id) {
		await this.fetch_api.postData("/newschedule/loadschedule", {training_id}).then(res => {
			this.tableBody.innerHTML = "";
			for (let i = 0; i < res.length; i++) {
				this.createRow();
			}
			let index = 0;
			let rows = document.getElementsByTagName("tr");
			for (let row of rows) {
				if (row.firstChild.tagName == "TH") {
					continue;
				}
				let exerciseInput = row.getElementsByClassName("exercise-input")[0];
				let repsInput = row.getElementsByClassName("reps-input")[0];
				let setsInput = row.getElementsByClassName("sets-input")[0];
				let commentInput = row.getElementsByClassName("comment-input")[0];
				
				let exerciseName = this.getExerciseName(res[index].exercise_id);
				let reps = res[index].reps;
				let sets = res[index].sets;
				let comment = res[index].comment;

				exerciseInput.value = exerciseName;
				repsInput.value = reps;
				setsInput.value = sets;
				commentInput.value = comment;

				index++;
			}
		});
	}

	showResultMessage(resultData) {
		if (!resultData.result) {
			alert(`Trainingsplan konnte nicht gespeichert werden, der User ${resultData.user} existiert nicht in der Datenbank!`);
		} else {
			this.displayOnSnackbar("Trainingsplan erfolgreich gespeichert.");
		}

	}

	async getAvailableExercises(msg) {
		await this.fetch_api.postData("/newschedule/getexercises").then(result => {
			this.availableExercises = result;
		});
		this.createDataList();
		msg ? this.displayOnSnackbar(msg) : null;
		
		this.getExerciseId("Schwimmen");
	}

	createDataList() {
		let datalist = document.getElementById(this.availableExercises);
		if (!datalist) {
			datalist = document.createElement("datalist");
			datalist.setAttribute("id", "availableExercises");
		}
		for (let exercise of this.availableExercises) {
			let option = document.createElement("option");
			option.value = exercise.name;
			datalist.appendChild(option);
		}
		document.body.appendChild(datalist);
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

	addButtonEventListeners() {
		document.getElementById("addRowButton").addEventListener("click",() => {
			this.createRow();
		});
		document.getElementById("submitButton").addEventListener("click", () => {
			this.saveTableData();
		});
		document.getElementById("button-refresh-available-exercises").addEventListener("click", () => {
			this.getAvailableExercises("Übungen aktualisiert");
		});
		document.getElementById("button-load-schedule").addEventListener("click", () => {
			this.loadScheduleOptions();
		});
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
			else if (element.tagName === "INPUT" && element.id !== "training-name-input") {
				element.addEventListener("keypress", (e) => {
					if (e.key === "Enter") {
						inputs[index+1] ? inputs[index+1].focus() : inputs[index].focus();
						element.setAttribute("data-event-click", "true");
					}
				});
			} 
			else {
				element.addEventListener("keypress", (e) => {
					if (e.key === "Enter") {
						if (!element[index+1]) {
							this.createRow();
						}
						inputs = document.querySelectorAll("input, textarea");
						nodes = Array.prototype.slice.call(inputs);
						inputs[index+1].focus();
						element.setAttribute("data-event-click", "true");
					}
				});
			}
		}
	}
}

export  {NewScheduleTableHandler}; 