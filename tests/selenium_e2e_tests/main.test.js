// const {By, Key} = require("selenium-webdriver");

const LoginPage = require("./pageObjects/loginPage");


describe("Website UI Tests", () => {

    describe("Registration Test", () => {
        test("Navigate to Register Page, Register new account, asuming it is preregistered", async () => {
            // await driver.get("http://localhost:8080/");
            // await driver.findElement(By.name("Login")).click();
            // let navbar = driver.findElement(By.css("nav"));
            // await navbar.findElement(By.linkText(`Login`)).click();
            // await driver.findElement(By.linkText("Registrieren")).click();
            // await driver.findElement(By.name("first_name")).sendKeys("Test");
            // await driver.findElement(By.name("surname")).sendKeys("Selenium");
            // await driver.findElement(By.name("email")).sendKeys("Selenium@test.de");
            // await driver.findElement(By.name("password")).sendKeys("selenium");
            // await driver.findElement(By.name("password_confirm")).sendKeys("selenium");
            // await driver.findElement(By.name("password_confirm")).submit();

        });
    });

    describe("Login Test", () => {
        test("Login fail", () => {
            let loginPage = new LoginPage();
            loginPage.enterEmail("gibberish@mail.de");
            loginPage.enterPassword("gibberish");
            loginPage.submit();
            expect(loginPage.verifyNoError()).toBeTruthy();
            loginPage.close();
        });
    });

});
    