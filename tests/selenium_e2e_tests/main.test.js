const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let service = new chrome.ServiceBuilder("C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/chromedriver.exe").build();
// chrome.setDefaultService(service);
let options = new chrome.Options();

describe("Open Google, search for Selenium and close window", () => {
    let driver = chrome.Driver.createSession(options, service);

    afterAll(async () => {
        await driver.quit();
    });

    test("Open Google, search for Selenium and close window", async () => {
        await driver.get("http://google.com");
        await driver.findElement(By.id("L2AGLb")).click();
        await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);
    });

});
    