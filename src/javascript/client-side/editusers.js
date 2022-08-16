import {Fetch_api} from "./modules/fetch_api.js";
import {CreateHtml} from "./modules/createHtml.js";
import {Snackbar} from "./modules/snackbar.js";

class UserControl {
    constructor() {}

    fetch_api = new Fetch_api();
    createHtml = new CreateHtml();
    snackbar = new Snackbar();
    registerList = [];
    userList = [];
    markedList = [];

    applyEventListeners() {
        document.querySelector("#users").addEventListener("click", () => {
            this.createUserTable();
        });
        document.querySelector("#registration").addEventListener("click", () => {
            this.createPreRegistrationTable();
        });
        document.querySelector("#expiring-users").addEventListener("click", () => {
            this.createMarkedUsersTable();
        });
        this.addSearching();
    }    

    applyDeleteEventListeners() {
        let deleteRegistrationButtons = document.querySelectorAll(".del-registration");
        deleteRegistrationButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                this.deletePreregistration(e.target);
            });
        });

        let deleteUserButtons = document.querySelectorAll(".del-user");
        deleteUserButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                this.markUserForDeletion(e.target);
            });
        });
        
        let deleteMarkedButtons = document.querySelectorAll(".del-marked");
        deleteMarkedButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                this.removeMarkedForDeletion(e.target);
            });
        });
    }

    async createUserTable() {
        this.createTableHead(["UserID", "Vorname", "Nachname", "Email", "Anmeldedatum", ""]);
        this.clearInputContainer();
        this.userList = await this.fetch_api.postData("/getusers").catch(() => {
            this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
        });
        let deleteButton = '<button type="button" class="btn button-delete del-user"></button>';
        let dataMatrix = this.userList.map((user) => {
            if (user.expiring_date) {
                return [];
            }
            let values = Object.values(user);
            values.pop();   // remove expiring_date
            values.push(deleteButton);
            return values;
        });
        this.fillTableBody(dataMatrix);
        this.applyDeleteEventListeners();
    }

    async createPreRegistrationTable() {
        this.createTableHead(["ID", "Name", "Email", ""]);
        this.createRegisterField();
        this.registerList = await this.fetch_api.postData("/getregistrationlist").catch(() => {
            this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
        });
        let deleteButton = '<button type="button" class="btn button-delete del-registration"></button>';
        let dataMatrix = this.registerList.map((entry) => {
            let values = Object.values(entry);
            values.push(deleteButton);
            return values;
        });
        this.fillTableBody(dataMatrix);
        this.applyDeleteEventListeners();
    }
    
    async deletePreregistration(element) {
        let tableRow = element.parentElement.parentElement;
        let id = tableRow.firstChild.innerHTML;
        let listEntry = this.registerList.find((entry) => entry.id == id);
        if (window.confirm(`${listEntry.email} wirklich löschen? Dieser Kunde wird sich nicht mehr registrieren können.`)) {
            await this.fetch_api.postData("/editusers/deletePreregister", {email: listEntry.email}).then(() => {
                this.createPreRegistrationTable();
                this.snackbar.displayOnSnackbar(`${listEntry.email} erfolgreich gelöscht`);
            }).catch(() => {
                this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
            });
        }
    }

    async createMarkedUsersTable() {
        this.createTableHead(["UserID", "Vorname", "Nachname", "Email", "Anmeldedatum", "Löschdatum", ""]);
        this.clearInputContainer();

        let deleteButton = '<button type="button" class="btn button-delete del-marked"></button>';
        this.markedList = await this.fetch_api.postData("/editusers/getMarkedUsers").catch(() => {
            this.snackbar.displayOnSnackbar("Irgentetwas ist schiefgelaufen.");
        });

        let dataMatrix = this.markedList.map((user) => {
            let values = Object.values(user);
            values.push(deleteButton);
            return values;
        });
        
        this.fillTableBody(dataMatrix);
        this.applyDeleteEventListeners();
    }

    async markUserForDeletion(element) {
        let tableRow = element.parentElement.parentElement;
        let id = tableRow.firstChild.innerHTML;
        let tableEntry = this.userList.find((entry) => entry.user_id == id);

        let today = new Date();
        let deletionDate = new Date();
        deletionDate.setDate(today.getDate() + 30);
        deletionDate = deletionDate.toISOString().split('T')[0];
        
        if (window.confirm(`${tableEntry.first_name} ${tableEntry.surname} wirklich löschen? Du kannst diese Aktion noch 30 Tage lang rückgängig machen.`)) {
            await this.fetch_api.postData("/editusers/markForDeletion", {
                user_id: tableEntry.user_id,
                date: deletionDate
            }).then(() => {
                this.createUserTable();
                this.snackbar.displayOnSnackbar(`${tableEntry.first_name} ${tableEntry.surname} zum löschen markiert.`);
            }).catch(() => {
                this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
            });
        }
    }

    async removeMarkedForDeletion(element) {
        let tableRow = element.parentElement.parentElement;
        let id = tableRow.firstChild.innerHTML;
        let tableEntry = this.markedList.find((entry) => entry.user_id == id);

        if (window.confirm(`Löschung von ${tableEntry.first_name} ${tableEntry.surname} wirklich abbrechen?`)) {
            await this.fetch_api.postData("/editusers/cancelDeletion", {user_id: id}).then(() => {
                this.createMarkedUsersTable();
                this.snackbar.displayOnSnackbar(`${tableEntry.first_name} ${tableEntry.surname} erfolgreich wiederhergestellt.`);
            }).catch(() => {
                this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
            });
        }
    }

    createTableHead(entries) {
        let thead = document.querySelector("thead");
        let tr = document.createElement("tr");
        for (let entry of entries) {
            if (entries.indexOf(entry) == 0 || entry == "") {
                let th = this.createHtml.createHtmlElement("th", [["class", "col-1"]], entry);
                tr.append(th);
                continue;
            }
            let th = this.createHtml.createHtmlElement("th", [], entry);
                
            tr.append(th);
        }
        thead.replaceChildren(tr);
    }

    addSearching() {
        let input = document.querySelector(".search-input");
        input.addEventListener("keyup", function() {
            let filter = this.value.toLowerCase();
            let table = document.querySelector("table");
            let rows = table.querySelectorAll("tbody tr");

            for (let row of rows) {
                let fields = row.querySelectorAll("td");
                let found = false;
                for (let field of fields) {
                    let value = field.textContent.toLowerCase();
                    if (value && value.indexOf(filter) != -1) found = true;
                }
                if (found) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        });
    }

    clearInputContainer() {
        let inputContainer = document.querySelector(".input-container");
        inputContainer.innerHTML = "";
    }

    fillTableBody(entries) {
        // takes [[val, val, val] [val, val, val]] and stupidly fills table with no checks
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let row of entries) {
            let tr = document.createElement("tr");
            for (let val of row) {
                let td = document.createElement("td");
                td.innerHTML = val;
                tr.append(td);
            }
            tbody.append(tr);
        }
    }

    createRegisterField() {
        let container = document.querySelector(".input-container");
        let heading =  this.createHtml.createHtmlElement("h5", [], "Neuen Nutzer vorregistrieren");
        let labelName = this.createHtml.createHtmlElement("label", [["for", "register-input-name"]], "Name: ");
        let inputName = this.createHtml.createHtmlElement("input", [["id", "register-input-name"], ["type", "text"], ["placeholder", "Name"]], "");
        let labelEmail = this.createHtml.createHtmlElement("label", [["for", "register-input-email"]], "Email: ");
        let inputEmail = this.createHtml.createHtmlElement("input", [["id", "register-input-email"], ["type", "text"], ["placeholder", "Email"]], "");
        let button = this.createHtml.createHtmlElement("button", [["class", "btn btn-secondary btn-sm"]], "Registrieren");
        button.addEventListener("click", async () => {
            await this.registerUser(inputName.value, inputEmail.value);
            this.createPreRegistrationTable();
        });
        container.replaceChildren(heading, labelName, inputName, labelEmail, inputEmail, button);
    }

    async registerUser(name, email) {
        if (!email) {
            alert("Bitte Email zum vorregistrieren angeben.");
            return;
        }
        let body = { name, email };
        await this.fetch_api.postData("/editusers/preregister", body).then(() => {
            this.snackbar.displayOnSnackbar(`${email} erfolgreich vorregistriert`);
        }).catch(() => {
            this.snackbar.displayOnSnackbar("Irgendetwas ist schiefgelaufen.");
        });
    }

    
}

window.onload = () => {
    let userControl = new UserControl();
    userControl.applyEventListeners();
    let snackbar = new Snackbar();
    snackbar.addSnackbar();
};