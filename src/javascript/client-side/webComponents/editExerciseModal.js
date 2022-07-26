class EditExerciseModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML= `
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="loadScheduleModal" aria-hidden="true">
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
                        <tbody id="edit-table"></tbody>
                    </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Abbrechen</button>
                </div>
                </div>
            </div>
        </div>
        `;

        
    }
    /*
#editModal.modal.fade(tabindex='-1' role='dialog' aria-labelledby='loadScheduleModal' aria-hidden='true')
    .modal-dialog(role='document' style="width: 75%; max-width: 900px")
        .modal-content
            .modal-header
                h5.modal-title Übung bearbeiten
                button.close(type='button' data-bs-dismiss='modal' aria-label='Close')
                    span(aria-hidden='true') ×
            .modal-body
                .table-responsive
                    table.table
                        thead 
                            tr
                                th.col-3 Übungsname 
                                th.col-9 Beschreibung
                        tbody#edit-table
                        
            .modal-footer
                button.btn.btn-secondary(type='button' data-bs-dismiss='modal') Abbrechen
*/
}

export {EditExerciseModal};