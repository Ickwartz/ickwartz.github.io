import {Fetch_api} from "./fetch_api.js";

class NewScheduleTableHandler  {
	constructor(){}

	fetch_api = new Fetch_api();
	rows = 0;

	tableBody = document.getElementById("input_body");

	createRow() {
		this.rows++;
		const tr = document.createElement("tr");

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
		ti_description.setAttribute("id", `commentInp${this.rows}`);
		ti_description.setAttribute("style", "width: 100%");
		ti_description.setAttribute("placeholder", "Beschreibung");
		ti_description.setAttribute("class", "table-input");
		td_description.appendChild(ti_description);

		tr.appendChild(td_exercise);
		tr.appendChild(td_reps);
		tr.appendChild(td_sets);
		tr.appendChild(td_description);

		this.tableBody.appendChild(tr);
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
            
            for (let i = 1; i <= this.rows; i++) {
                let exercise = document.getElementById(`exerciseInp${i}`).value;
                let reps = document.getElementById(`repsInp${i}`).value;
				reps == "" ? reps = 0 : reps;
                let sets = document.getElementById(`setsInp${i}`).value;
				sets == "" ? sets = 0 : sets;
                let comment = document.getElementById(`commentInp${i}`).value;
                if (exercise == "") {
                    alert("Bitte alle Felder für Übungsnamen ausfüllen");
					return null;
                } else {
                    exerciseData.push({
                        exercise: exercise,
                        reps: reps,
                        sets: sets,
                        comment: comment,
                    });
                }
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

	showResultMessage(resultData) {
		if (!resultData.result) {
			alert(`Trainingsplan konnte nicht gespeichert werden, der User ${resultData.user} existiert nicht in der Datenbank!`);
		} else if (resultData.missingExercises > 0) {
			alert("Trainingsplan konnte nur teilweise gespeichert werden, folgende Übungen sind nicht in der Datenbank gespeichert: ", resultData.missingExercises);
		} else {
			this.displayOnSnackbar("Trainingsplan erfolgreich gespeichert.");
		}

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

	applyKeyListeners() {
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