const { By, until } = require("selenium-webdriver");
const Page = require("./page");

class LoginPage extends Page {
    constructor() {
        super();
    }

    async open() {
        await super.open("login");
    }

    async enterEmail(input) {
        let emailInput = await this.driver.findElement(By.name("email"));
        await emailInput.sendKeys(input);
    }

    async enterPassword(pw) {
        let pwInput = await this.driver.findElement(By.name("password"));
        await pwInput.sendKeys(pw);
    }

    async submit() {
        let submitButton = await this.driver.findElement(By.css('button[type="submit"]'));
        submitButton.click();
        let re = new RegExp(`^(?!(${this.baseUrl+"login"})$).*$`, "g"); // alles das nicht baseURL/login ist
        await this.driver.wait(until.urlMatches(re), 5000, "Timed out after submit", 500);
    }

    async verifyError() {
        let errorMessage = await this.driver.findElements(By.xpath(`//h4[text()="Falsche Email und/oder Passwort"]`));
        if (errorMessage.length > 0) {
            return true;
        }
        return false;
    }

    async verifySuccess() {
        let url = await this.driver.getCurrentUrl();
        return url == this.baseUrl ? true : false; 
    }

    async getRegisterLink() {
        return await this.driver.findElement(By.linkText("Registrieren"));
    }

    async getForgotPwLink() {
        return await this.driver.findElement(By.linkText("Passwort vergessen?"));
    }

    // enterUser etc
    // verify no Error
    // return this for chaining
    // By.css("[]")
}

module.exports = LoginPage;