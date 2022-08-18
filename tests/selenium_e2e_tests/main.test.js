// const {By, Key} = require("selenium-webdriver");

const LoginPage = require("./pageObjects/loginPage");


describe("Website UI Tests", () => {

    describe("Login Test", () => {
        
        test("Login fail", async () => {
            let loginPage = new LoginPage();
            await loginPage.open();
            await loginPage.enterEmail("gibberish@mail.de");
            await loginPage.enterPassword("gibberish");
            await loginPage.submit();
            let errorDisplayed = await loginPage.verifyError();
            await loginPage.quit(); 
            expect(errorDisplayed).toBeTruthy();
        });

        test("Login successfull", async () => {
            let loginPage = new LoginPage();
            await loginPage.open();
            await loginPage.enterEmail("selenium@test.de");
            await loginPage.enterPassword("selenium");
            await loginPage.submit();
            await new Promise(r => setTimeout(r, 3000));
            let success = await loginPage.verifySuccess();
            await loginPage.quit(); 
            expect(success).toBeTruthy();
        });
    });
});
    