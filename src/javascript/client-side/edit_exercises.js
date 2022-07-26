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
        tbody.innerHTML = "";
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
            editLink.setAttribute("data-bs-target", "#edit-modal");
            editLink.addEventListener("click", () => {
                this.editExercise(exercise);
            });
            edit.appendChild(editLink);

            tr.append(nr, exerciseName, description, edit);
            tbody.append(tr);
        }
    }
    
    editExercise(exercise) {
        let modal = document.querySelector("edit-modal");
        modal.fillModalBody(exercise);
        modal.addClickButton(this, exercise);
    }

    async updateExercise(exercise, modal) {
        let name = modal.querySelector("input").value;
        let description = modal.querySelector("textarea").value;
        exercise.name = name;
        exercise.description = description;
        await this.fetch_api.postData("/editexercises/update", exercise).then(() => {
            console.log("success");
        });
        this.loadExercises();
    }
    
}

window.onload = () => {
    window.customElements.define("edit-modal", EditExerciseModal);
    let editHandler = new editExercisesHandler();
    editHandler.loadExercises();
};