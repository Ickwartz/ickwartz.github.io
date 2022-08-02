import {CreateHtml} from "./createHtml.js";
import {Fetch_api} from "./fetch_api.js";

class TrainingScheduleHandler {
    constructor() {}

    createHtml = new CreateHtml();
    fetch_api = new Fetch_api();
    
    displayModal = document.querySelector("new-modal");

    displayTraining(training) {
        console.log(training);
        this.showModal(training);
    }

    showModal(training) {
        this.displayModal.setTitle(`${training.date}: ${training.name}`);
        this.fillModalBody(training.training_id);
        this.displayModal.setSaveFunction(this.saveTrainingComments);
        this.displayModal.show();
    }

    async fillModalBody(id) {
        let body = this.displayModal.getBody();
        this.fetch_api.postData("/training/getTraining", {training_id: id}).then((data) => {
            console.log(data);
            body.append(this.createTable(data));
            body.append(this.createCommentArea());
        }).catch((error) => {
            body.innerHTML = "Es gab einen Fehler beim laden des Trainingsplans.";
            console.error(error);
            return;
        });
    }

    createTable(data) {
        let table = this.createTableBase();
        let tableBody = this.createTableBody(data);
        table.querySelector("table").append(tableBody);
        return table;
    }

    createTableBase() {
        let table = document.createElement("div");
        table.innerHTML = `
        <div class="container table-container">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                        <th class="col-1"></th>
                        <th class="col-1" scope="col">#</th>
                        <th class="col-2" scope="col">Übung</th>
                        <th class="col-2" scope="col">Wdh</th>
                        <th class="col-2" scope="col">Sätze</th>
                        <th class="col-4" scope="col">Anmerkung</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        `;
        return table;
    }

    createTableBody(data) {
        let counter = 1;
        let tbody = document.createElement("tbody");
        for (let set of data) {
            let row = this.createHtml.createHtmlElement("tr", [
                ["class", "accordion-toggle collapsed"],
                ["id", "accordion"+counter],
                ["data-bs-toggle", "collapse"],
                ["data-bs-parent", "#accordion"+counter],
                ["href", "#collapse"+counter]
            ]);
            let expandButton = this.createHtml.createHtmlElement("td", [["class", "expand-button"]]);
            let head =  this.createHtml.createHtmlElement("th", [["scope", "row"]], counter);
            let td1 = this.createHtml.createHtmlElement("td", [], set.name);
            let td2 = this.createHtml.createHtmlElement("td", [], set.reps);
            let td3 = this.createHtml.createHtmlElement("td", [], set.sets);
            let td4 = this.createHtml.createHtmlElement("td", [], set.comment);
            row.append(expandButton, head, td1, td2, td3, td4);

            let hiddenRow = this.createHtml.createHtmlElement("tr", [["class", "hide-table-padding"]]);
            let hiddenTd = this.createHtml.createHtmlElement("td", [["colspan", "10"]]);
            let hiddenContainer = this.createHtml.createHtmlElement("div", [["class", "collapse in"], ["id", "collapse"+counter]]);
            let description = this.createHtml.createHtmlElement("p", [], set.description);
            hiddenContainer.append(description);
            hiddenTd.append(hiddenContainer);
            hiddenRow.append(document.createElement("td"), hiddenTd);

            tbody.append(row, hiddenRow);
            counter++;
        }
        return tbody;
    }

    createCommentArea() {
        let commentHeading = this.createHtml.createHtmlElement("p", [], "Eigene Kommentare:");
        let commentField = document.createElement("textarea");
        commentField.style = "width: 100%; height: 300px;";
        let commentArea = document.createElement("div");
        commentArea.append(commentHeading, commentField);

        return commentArea;
    }

    saveTrainingComments() {
        console.log("save");
    }
}

export {TrainingScheduleHandler};