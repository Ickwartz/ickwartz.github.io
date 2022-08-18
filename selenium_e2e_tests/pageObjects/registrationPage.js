const { By } = require("selenium-webdriver");
const Page = require("./page");

class RegistrationPage extends Page {
    constructor() {
        super();
    }

    async open() {
        await super.open("register");
    }

    async enterFirstName(name) {
        let input = await this.driver.findElement(By.name("first_name"));
        await input.sendKeys(name);
        return this;
    }

    async enterSurname(name) {
        let input = await this.driver.findElement(By.name("surname"));
        await input.sendKeys(name);
        return this;
    }

    async enterEmail(mail) {
        let input = await this.driver.findElement(By.name("email"));
        await input.sendKeys(mail);
        return this;
    }

    async enterPassword(pw) {
        let input = await this.driver.findElement(By.name("password"));
        await input.sendKeys(pw);
        return this;
    }

    async enterPasswordConfirm(pw) {
        let input = await this.driver.findElement(By.name("password_confirm"));
        await input.sendKeys(pw);
        return this;
    }

    async submit() {
        let submitButton = await this.driver.findElement(By.css('button[type="submit"]'));
        await await submitButton.click();
        return this;
    }

    async alreadyRegistered() {
        let infoMessage = await this.driver.findElements(By.css('h4[text="Es ist schon ein Nutzer mit dieser Email registriert."]'));
        console.log(infoMessage);
        return infoMessage.length > 0 ? true : false;
    }

    async notPreregistered() {
        let infoMessage = await this.driver.findElements(By.css('h4[text="Bitte melden Sie sich bei mir an, bevor Sie sich auf dieser Seite registrieren."]'));
        console.log(infoMessage);
        return infoMessage.length > 0 ? true : false;
    }
}

module.exports = RegistrationPage;