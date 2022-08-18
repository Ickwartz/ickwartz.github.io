const { By } = require("selenium-webdriver");
const Page = require("./page");

class LoginPage extends Page {
    constructor() {
        super();
    }

    async open() {
        await super.open("/login");
    }

    async enterEmail(input) {
        let emailInput = await this.driver.findElement(By.name("email"));
        await emailInput.sendKeys(input);
        return this;
    }

    async enterPassword(pw) {
        let pwInput = await this.driver.findElement(By.name("password"));
        await pwInput.sendKeys(pw);
        return this;
    }

    async submit() {
        let submitButton = await this.driver.findElement(By.css('button[type="submit"]'));
        submitButton.click();
        return this;
    }

    async verifyNoError() {
        let errorMessage = await this.driver.findElements(By.css('h4[text="Falsche Email und/oder Passwort"]'));
        if (errorMessage.length > 0) {
            return true;
        }
        return false;
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