import {Fetch_api} from "./fetch_api.js";
import {Snackbar} from "./snackbar.js";
import {CreateHtml} from"./createHtml.js";

class NewScheduleTableHandler  {
	constructor(){}

	fetch_api = new Fetch_api();
	snackbar = new Snackbar();
	createHtml = new CreateHtml().createHtmlElement;
	availableExercises = [];	// suggestions for exercises
	loadingPresets = {};	// to fill in name, date etc inputs after loading

	tableBody = document.getElementById("input_body");

	createRow() {
		const tr = document.createElement("tr");

        let td_exercise = document.createElement("td");
		let ti_exercise = this.createHtml("input", [
			["type", "text"],
			["placeholder", "Übung"],
			["list", "availableExercises"],
			["class", "table-input exercise-input"]
		]);
		td_exercise.appendChild(ti_exercise);

        let td_reps = document.createElement("td");
		let ti_reps = this.createHtml("input", [
			["type", "text"],
			["placeholder", "Reps"],
			["class", "table-input reps-input"]
		]);
		td_reps.appendChild(ti_reps);

        let td_sets = document.createElement("td");
		let ti_sets = this.createHtml("input", [
			["type", "text"],
			["placeholder", "Sets"],
			["class", "table-input sets-input"]
		]);
		td_sets.appendChild(ti_sets);

		let td_description = document.createElement("td");
		let ti_description = this.createHtml("textarea", [
			["style", "width: 100%"],
			["maxlength", "300"],
			["placeholder", "Beschreibung"],
			["class", "table-input comment-input"]
		]);
		td_description.appendChild(ti_description);

		let td_delete = this.createHtml("td",[["style", "text-align: center"]]);
		let b_delete = this.createHtml("button",[["type", "button"], ["class", "btn button-delete"]]);
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
        
        let user = document.querySelector("#user-input").value;
        let date_val = document.querySelector("#date-input").value;
        let trainingName = document.querySelector("#training-name-input").value;
        if (user == "" || date_val == "" || trainingName == "") {
            alert("Bitte User, Datum und Namen des Trainings angeben");
			return;
        } else {    
            let data = {};

			data.user = user;
			data.dateData = this.getDateData();
			data.trainingName = trainingName;
			let exerciseData = []; 
			let rows = document.querySelectorAll("#input_body tr");
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
    
	getDateData() {
		let dateData = {};
        let date_val = document.querySelector("#date-input").value;
		let startDate = new Date(date_val);
		dateData.startDate = startDate.toISOString().split('T')[0];
		let repDuration = document.querySelector("#repeat-duration").value;
		if (repDuration == 0) return dateData;

		let endDate = new Date(date_val);
		endDate.setMonth(endDate.getMonth() + parseInt(repDuration));
		dateData.endDate = endDate.toISOString().split("T")[0];
		dateData.repetitionPattern = this.getRepetitionPattern();
		return dateData;
	}

	getRepetitionPattern() {
		let weekdays = document.querySelectorAll("#repetition-weekdays input");
		let selectedDays = [];
		for (let day of weekdays) {
			if(day.checked) selectedDays.push(day.name);
		}
		return this.calculateRepeatPattern(selectedDays);
	}

	calculateRepeatPattern(days) {
		let weekdayBitValue = {
			"sunday": 	0b00000001, 
			"monday": 	0b00000010,
			"tuesday": 	0b00000100,
			"wednesday":0b00001000,
			"thursday": 0b00010000,
			"friday":	0b00100000,
			"saturday": 0b01000000,
		};
		// if (days == []) {}   // why not working?
		if (!days[0]) {
			return 0;
		} else {
			return (weekdayBitValue[days.shift()] + this.calculateRepeatPattern(days));
		}
	}
	
	async saveTableData() {
		let tableData = this.getTableData();
		if (!tableData) {
			alert("Es konnten keine Daten gelesen werden.");
			return;
		}
		if (!tableData.exerciseData) {
			alert("Es konnten keine Übungen gelesen werden.");
			return;
		}
		this.fetch_api.postData("/newschedule/save", tableData).then(result => {
			this.showResultMessage(result);
		}).catch(() => {
			this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
			});

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
		let user_val = document.getElementById("loading-user-input").value;
		this.loadingPresets.user = user_val;
		let first_name = user_val.split(" ")[0];
		let surname = user_val.split(" ")[1];

		let date_val = document.getElementById("loading-date-input").value;
		let month = date_val.split("-")[1];
		let year = date_val.split("-")[0];
		if (!(first_name && surname && month)) {
			alert("Vorname, Nachname und Monat benötigt");
			return null;
		}

		let data = {first_name, surname, month, year};
		
		await this.fetch_api.postData("/newschedule/getschedules", data).then(result => {
			let modalBody = document.getElementsByClassName("modal-body")[0];
			let heading = document.createElement("h6");
			heading.textContent = `Trainings von ${user_val} im ${month} ${year}: `;
			let list = this.createScheduleOptionsList(result);
			modalBody.innerHTML="";
			modalBody.appendChild(heading);
			modalBody.appendChild(list);
		}).catch(() => {
			this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
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
				this.loadingPresets.trainingName = schedule.name;
			});
			scheduleLink.style = "text-decoration: none; color: black;";
			listItem.appendChild(scheduleLink);
			list.appendChild(listItem);
		}
		return list;
	}

	async loadSchedule(training_id) {
		let res = {};
		try {
			res = await this.fetch_api.postData("/newschedule/loadschedule", {training_id});
		} catch {
            this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
		}
		let schedule = res.schedule;
		let userInput = document.getElementById("user-input");
		let dateInput = document.getElementById("date-input");
		let trainingInput = document.getElementById("training-name-input");
		userInput.value = this.loadingPresets.user;

		dateInput.value = res.date;
		if (res.repetition) {
			this.fillRepetitionInputs(res.repetition, res.date);
		}

		trainingInput.value = this.loadingPresets.trainingName;
		this.tableBody.innerHTML = "";
		for (let i = 0; i < schedule.length; i++) {
			this.createRow();
		}
		let index = 0;
		let rows = document.querySelectorAll("#input_body tr");
		for (let row of rows) {
			if (row.firstChild.tagName == "TH") {
				continue;
			}
			let exerciseInput = row.getElementsByClassName("exercise-input")[0];
			let repsInput = row.getElementsByClassName("reps-input")[0];
			let setsInput = row.getElementsByClassName("sets-input")[0];
			let commentInput = row.getElementsByClassName("comment-input")[0];
			
			let exerciseName = this.getExerciseName(schedule[index].exercise_id);
			let reps = schedule[index].reps;
			let sets = schedule[index].sets;
			let comment = schedule[index].comment;

			exerciseInput.value = exerciseName;
			repsInput.value = reps;
			setsInput.value = sets;
			commentInput.value = comment;

			index++;
		}
		this.resetLoadingModal();
	}

	fillRepetitionInputs(repetitionData, date) {
		let repDurationInput = document.querySelector("#repeat-duration");
		let startDate = new Date(date);
		let endDate = new Date(repetitionData.end_date);
		repDurationInput.value = Math.round((endDate-startDate)/(1000*3600*24*30));

		let weekdayInputs = document.querySelectorAll("#repetition-weekdays input");
		let repPattern = repetitionData.repetition_pattern;
		let weekdays = {
			"sunday": 0b00000001,
			"monday": 0b00000010,
			"tuesday": 0b00000100,
			"wednesday": 0b00001000,
			"thursday": 0b00010000,
			"friday": 0b00100000,
			"saturday": 0b01000000,
			};
		for (let day of weekdayInputs) {
			if (!(weekdays[day.id] & repPattern)) continue;
			day.checked = true;
		}
	}

	resetLoadingModal() {
		let modalBody = document.getElementsByClassName("modal-body")[0];
		modalBody.innerHTML = "";
		
		let userLabel= document.createElement("label");
		userLabel.setAttribute("for", "loading-user-input");
		userLabel.textContent = "Vor- und Nachname:";

		let userInput = document.createElement("input");
		userInput.setAttribute("type", "text");
		userInput.id = "loading-user-input";
		userInput.placeholder = "User";

		let br = document.createElement("br");
		
		let dateLabel= document.createElement("label");
		dateLabel.setAttribute("for", "loading-date-input");
		dateLabel.textContent = "Monat:";

		let dateInput = document.createElement("input");
		dateInput.setAttribute("type", "month");
		dateInput.id ="loading-date-input";

		modalBody.appendChild(userLabel);
		modalBody.appendChild(userInput);
		modalBody.appendChild(br);
		modalBody.appendChild(dateLabel);
		modalBody.appendChild(dateInput);
	}

	showResultMessage(resultData) {
		if (!resultData.result) {
			alert(`Trainingsplan konnte nicht gespeichert werden, der User ${resultData.user} existiert nicht in der Datenbank!`);
		} else {
			this.snackbar.displayOnSnackbar("Trainingsplan erfolgreich gespeichert.");
		}

	}

	async getAvailableExercises(msg) {
		await this.fetch_api.postData("/getexercises").then(result => {
			this.availableExercises = result;
		}).catch(() => {
            this.snackbar.displayOnSnackbar("Fehler beim laden der Übungen.");
        });
		this.createAvailableExercisesList();
		msg ? this.snackbar.displayOnSnackbar(msg) : null;
	}

	createAvailableExercisesList() {
		let datalist = document.getElementById("availableExercises");
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

	async getAvailableUsers() {
		await this.fetch_api.postData("/getUsers").then(result => {
			this.createAvailableUsersList(result);
		}).catch(() => {
			this.snackbar.displayOnSnackbar("Fehler beim laden der User.");
		});
	}

	createAvailableUsersList(availableUsers) {
		let datalist = document.querySelector("#availableUsersList");
		if (!datalist) {
			datalist = document.createElement("datalist");
			datalist.setAttribute("id", "availableUsersList");
		}
		for (let user of availableUsers) {
			let option = document.createElement("option");
			option.value = `${user.first_name} ${user.surname}`;
			datalist.appendChild(option);
		}
		document.body.appendChild(datalist);
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
		document.getElementById("button-reset-loading").addEventListener("click", () => {
			this.resetLoadingModal();
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

export  {NewScheduleTableHandler}; 