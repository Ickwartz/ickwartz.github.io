class newModal extends HTMLElement {
    constructor() {
        super();
    }

    setId(id) {
        this.querySelector(".modal").id = id;
    }
    
    getHeader() {
        return this.querySelector(".modal-header");
    }

    getBody() {
        return this.querySelector(".modal-body");
    }
    
    getFooter() {
        return this.querySelector(".modal-footer");
    }

    setSaveFunction(func) {
        let saveButton = this.querySelector('.modal-save-button');
        saveButton.addEventListener("click", () => func());
    }

    setTitle(text) {
        let title = this.querySelector(".modal-title");
        title.textContent = text;
    }

    show() {
        let modal = this.querySelector(".modal");
        modal.style.opacity = 1;
        modal.style.display = "block";
    }

    hide() {
        let modal = this.querySelector(".modal");
        modal.style.opacity = 0;
        modal.style.display = "none";
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal" tabindex="-1" role="dialog" aria-labelledby="trainingModal" aria-hidden="true">
            <div class="modal-dialog" role="document" style="width: 75%; max-width: 900px">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button class="close hide-modal-button" type="button" aria-label="Close" name="close_button"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary hide-modal-button" type="button" name="close_button">Schließen</button>
                        <button class="btn btn-primary modal-save-button" type="button" name="save_button">Speichern</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        let closeButtons = this.querySelectorAll(".hide-modal-button");
        for (let button of closeButtons) {
            button.addEventListener("click", () => this.hide());
        }
    }
}

export {newModal};