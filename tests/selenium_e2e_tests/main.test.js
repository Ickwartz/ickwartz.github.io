const {By, Key} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let service = new chrome.ServiceBuilder("C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/chromedriver.exe").build();
let options = new chrome.Options();
options.addArguments("start-maximized");

describe("Website UI Tests", () => {
    let driver = chrome.Driver.createSession(options, service);

    afterAll(async () => {
        await driver.quit();
    });
    // multiple describes for synchronous tests (cant test localhost when on google)
    // describe("Basic Selenium test", () => {
    //     test("Open Google and search for Selenium", async () => {
    //         await driver.get("http://google.com");
    //         await driver.findElement(By.id("L2AGLb")).click();
    //         await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);
    //     });
    // });

    describe("Registration Test", () => {
        test("Navigate to Register Page, Register new account, asuming it is preregistered", async () => {
            await driver.get("http://localhost:8080/");
            // await driver.findElement(By.name("Login")).click();
            let navbar = driver.findElement(By.css("nav"));
            await navbar.findElement(By.linkText(`Login`)).click();
            await driver.findElement(By.linkText("Registrieren")).click();
            await driver.findElement(By.name("first_name")).sendKeys("Test");
            await driver.findElement(By.name("surname")).sendKeys("Selenium");
            await driver.findElement(By.name("email")).sendKeys("Selenium@test.de");
            await driver.findElement(By.name("password")).sendKeys("selenium");
            await driver.findElement(By.name("password_confirm")).sendKeys("selenium");
            await driver.findElement(By.name("password_confirm")).submit();
            await new Promise(r => setTimeout(r, 4000));
        });
    });

});
    