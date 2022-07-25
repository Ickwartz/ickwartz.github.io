import {Fetch_api} from "./modules/fetch_api.js";

class editExercisesHandler {
    constructor() {}

    fetch_api = new Fetch_api();

    async loadExercises() {
        await this.fetch_api.postData("/getexercises").then((result) => {
            this.createExercisesTable(result);
        });
    }

    createExercisesTable(exercises) {
        exercises.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });

        let tbody = document.getElementsByTagName("tbody")[0];
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
            edit.appendChild(editLink);

            tr.appendChild(nr);
            tr.appendChild(exerciseName);
            tr.appendChild(description);
            tr.appendChild(edit);            

            tbody.appendChild(tr);
        }
    }
}

window.onload = () => {
    let editHandler = new editExercisesHandler();
    editHandler.loadExercises();
};