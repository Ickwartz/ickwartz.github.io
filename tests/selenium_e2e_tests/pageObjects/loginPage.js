const { By } = require("selenium-webdriver");
const Page = require("./page");

class LoginPage extends Page {
    constructor() {
        super();
    }

    get EmailInput () {
        return this.driver.findElement(By.name("email"));
    }

    get PasswordInput () {
        return this.driver.findElement(By.name("password"));
    }

    get submitBtn () {
        return this.driver.findElement(By.id("submit_button"));
    }

    get ForgotPassword () {
        return this.driver.findElement(By.linkText("Passwort vergessen?"));
    }

    get Register () {
        return this.driver.findElement(By.linkText("Registrieren"));
    }

    enterEmail(input) {
        this.EmailInput.sendKeys(input);
        return this;
    }

    enterPassword(pw) {
        this.PasswordInput.sendKeys(pw);
        return this;
    }

    submit() {
        this.EmailInput.submit();
        return this;
    }

    verifyNoError() {
        let errorMessage = this.driver.findElements(By.css('h4[text="Falsche Email und/oder Passwort"]'));
        if (errorMessage.length == 0) {
            return false;
        }
        return true;
    }

    // enterUser etc
    // verify no Error
    // return this for chaining
    // By.css("[]")
}

module.exports = LoginPage;