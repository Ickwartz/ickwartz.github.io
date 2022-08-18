const RegistrationPage = require("./pageObjects/registrationPage");

describe("Registration Test", () => {
    test("Already Registered", async () =>  {
        let registerPage = new RegistrationPage();
        await registerPage.open();
        await registerPage.enterFirstName("Selenium");
        await registerPage.enterSurname("test");
        await registerPage.enterEmail("selenium@test.de");
        await registerPage.enterPassword("123456");
        await registerPage.enterPasswordConfirm("123456");
        await registerPage.submit();
        let alreadyRegistered = await registerPage.alreadyRegistered();
        await registerPage.quit();
        expect(alreadyRegistered).toBeTruthy();
    });

    
    test("Not preregistered", async () =>  {
        let registerPage = new RegistrationPage(); 
        await registerPage.open();
        await registerPage.enterFirstName("Selenium");
        await registerPage.enterSurname("test");
        await registerPage.enterEmail("foo@bar.de");
        await registerPage.enterPassword("123456");
        await registerPage.enterPasswordConfirm("123456");
        await registerPage.submit();
        let notPreregistered = await registerPage.notPreregistered();
        await registerPage.quit();
        expect(notPreregistered).toBeTruthy();
    });
});