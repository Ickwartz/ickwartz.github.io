class EditExerciseModal extends HTMLElement {
    constructor() {
        super();
    }

    cancelButton = '<button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Abbrechen</button>'

    addSaveButton(callingClass, exercise) {
        let modalFooter = this.querySelector(".modal-footer");
        modalFooter.innerHTML = this.cancelButton;
        let saveButton = document.createElement("button");
        saveButton.setAttribute("class", "btn btn-primary");
        saveButton.setAttribute("data-bs-dismiss", "modal");
        saveButton.textContent = "Speichern";
        saveButton.addEventListener("click", () => {
            callingClass.updateExercise(exercise, this);
        });
        modalFooter.append(saveButton);
    }

    fillModalBody(exercise) {
        let modalTableBody = this.querySelector("tbody");

        let nameTd = document.createElement("td");
        let modalExerciseName = document.createElement("input");
        modalExerciseName.placeholder = "Übungsname";
        modalExerciseName.style = "margin: 5px";
        modalExerciseName.value = exercise.name;
        nameTd.appendChild(modalExerciseName);


        let descTd = document.createElement("td");
        let modalExerciseDescription = document.createElement("textarea");
        modalExerciseDescription.maxLength = "500";
        modalExerciseDescription.placeholder = "Beschreibung";
        modalExerciseDescription.style = "margin: 5px; width: 95%";
        modalExerciseDescription.value = exercise.description;
        descTd.appendChild(modalExerciseDescription);

        modalTableBody.replaceChildren(nameTd, descTd);
    }

    connectedCallback() {
        this.innerHTML= `
        <div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="loadScheduleModal" aria-hidden="true">
            <div class="modal-dialog" role="document" style="width: 75%; max-width: 900px">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Übung bearbeiten</h5>
                        <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="col-3">Übungsname </th>
                                <th class="col-9">Beschreibung</th>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        ${this.cancelButton}
                    </div>
                </div>
            </div>
        </div>
        `;        
    }
}

export {EditExerciseModal};