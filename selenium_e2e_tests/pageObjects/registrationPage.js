const { By, until } = require("selenium-webdriver");
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
    }

    async enterSurname(name) {
        let input = await this.driver.findElement(By.name("surname"));
        await input.sendKeys(name);
    }

    async enterEmail(mail) {
        let input = await this.driver.findElement(By.name("email"));
        await input.sendKeys(mail);
    }

    async enterPassword(pw) {
        let input = await this.driver.findElement(By.name("password"));
        await input.sendKeys(pw);
    }

    async enterPasswordConfirm(pw) {
        let input = await this.driver.findElement(By.name("password_confirm"));
        await input.sendKeys(pw);
    }

    async submit() {
        let submitButton = await this.driver.findElement(By.css('button[type="submit"]'));
        await await submitButton.click();
        let re = new RegExp(`^(?!(${this.baseUrl+"register"})$).*$`, "g");  // alles das nicht baseURL/register ist
        await this.driver.wait(until.urlMatches(re), 5000, "Timed out after submit", 500);
    }

    async alreadyRegistered() {
        let infoMessage = await this.driver.findElements(By.xpath('//h4[text()="Es ist schon ein Nutzer mit dieser Email registriert."]'));
        return infoMessage.length > 0 ? true : false;
    }

    async notPreregistered() {
        let infoMessage = await this.driver.findElements(By.xpath('//h4[text()="Bitte melden Sie sich bei mir an, bevor Sie sich auf dieser Seite registrieren."]'));
        return infoMessage.length > 0 ? true : false;
    }
}

module.exports = RegistrationPage;