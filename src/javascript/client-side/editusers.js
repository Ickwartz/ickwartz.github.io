import {Fetch_api} from "./modules/fetch_api.js";
import {CreateHtml} from "./modules/createHtml.js";

class UserControl {
    constructor() {}

    fetch_api = new Fetch_api();
    createHtml = new CreateHtml();

    applyEventListeners() {
        document.querySelector("#users").addEventListener("click", () => {
            this.createUserTable();
        });
        document.querySelector("#registration").addEventListener("click", () => {
            this.createPreRegistrationTable();
        });
    }

    async createUserTable() {
        this.createTableHead(["UserID", "Vorname", "Nachname", "Email", "Anmeldedatum"]);
        let userData = await this.fetch_api.postData("/getusers");
        let dataMatrix = userData.map((user) => Object.values(user));
        this.fillTableBody(dataMatrix);
    }

    async createPreRegistrationTable() {
        this.createTableHead(["ID", "Name", "Email"]);
        this.createRegisterField();
        let registerList = await this.fetch_api.postData("/getregistrationlist");
        let dataMatrix = registerList.map((entry) => Object.values(entry));
        this.fillTableBody(dataMatrix);
    }

    createTableHead(entries) {
        let thead = document.querySelector("thead");
        let tr = document.createElement("tr");
        for (let entry of entries) {
            let th = document.createElement("th");
            th.textContent = entry;
            tr.append(th);
        }
        thead.replaceChildren(tr);
    }

    fillTableBody(entries) {
        // takes [[val, val, val] [val, val, val]] and stupidly fills table with no checks
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let row of entries) {
            let tr = document.createElement("tr");
            for (let val of row) {
                let td = document.createElement("td");
                td.textContent = val;
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
        button.addEventListener("click", () => {
            this.registerUser(inputName.value, inputEmail.value);
            this.createPreRegistrationTable();
        });
        container.replaceChildren(heading, labelName, inputName, labelEmail, inputEmail, button);
    }

    async registerUser(name, email) {
        let body = { name, email };
        await this.fetch_api.postData("/editusers/preregister", body).then(() => {
            // TODO Snackbar
        });
    }

    
}

window.onload = () => {
    let userControl = new UserControl();
    userControl.applyEventListeners();
};