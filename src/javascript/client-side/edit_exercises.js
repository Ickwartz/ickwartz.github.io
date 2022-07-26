import {Fetch_api} from "./modules/fetch_api.js";
import {EditExerciseModal} from "./webComponents/editExerciseModal.js";

class editExercisesHandler {
    constructor() {}

    fetch_api = new Fetch_api();

    exerciseList = [];

    async loadExercises() {
        await this.fetch_api.postData("/getexercises").then((result) => {
            this.exerciseList = result;
            this.createExercisesTable(this.exerciseList);
        });
    }

    createExercisesTable(exercises) {
        exercises.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });

        let tbody = document.getElementById("display-table");
        let counter = 0;
        for (let exercise of exercises) {
            counter++;
            let tr = document.createElement("tr");

            let nr = document.createElement("td");
            nr.textContent = counter;

            let exerciseName = document.createElement("td");
            exerciseName.textContent = exercise.name;

            let description = document.createElement("td");
            description.textContent = exercise.description;

            let edit = document.createElement("td");
            let editLink = document.createElement("a");
            editLink.href = "#";
            editLink.textContent = "bearbeiten";
            editLink.style ="color: black";
            editLink.setAttribute("data-bs-toggle", "modal");
            editLink.setAttribute("data-bs-target", "#editModal");
            editLink.addEventListener("click", () => {
                this.editExercise(exercise);
            });
            edit.appendChild(editLink);

            tr.append(nr, exerciseName, description, edit);
            tbody.appendChild(tr);
        }
    }
    
    editExercise(exercise) {
        this.fillModalBody(exercise);


    }

    fillModalBody(exercise) {
        let modalTableBody = document.getElementById("edit-table");

        let nameTd = document.createElement("td");
        let modalExerciseName = document.createElement("input");
        modalExerciseName.placeholder = "Übungsname";
        modalExerciseName.style = "margin: 5px";
        modalExerciseName.value = exercise.name;
        nameTd.appendChild(modalExerciseName);


        let descTd = document.createElement("td");
        let modalExerciseDescription = document.createElement("textarea");
        modalExerciseDescription.placeholder = "Beschreibung";
        modalExerciseDescription.style = "margin: 5px; width: 95%";
        modalExerciseDescription.value = exercise.description;
        descTd.appendChild(modalExerciseDescription);

        modalTableBody.replaceChildren(nameTd, descTd);
    }
}

window.onload = () => {
    window.customElements.define("edit-modal", EditExerciseModal);
    let editHandler = new editExercisesHandler();
    editHandler.loadExercises();
};