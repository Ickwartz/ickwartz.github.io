const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let service = new chrome.ServiceBuilder("C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/chromedriver.exe").build();
// chrome.setDefaultService(service);
let options = new chrome.Options();

async function example() {
    // let driver = await new Builder().forBrowser(chrome).build();
    let driver = chrome.Driver.createSession(options, service);
    await driver.get("http://google.com");
    try {
        await driver.findElement(By.id("L2AGLb")).click();
    } catch (error) {
        console.log("Fehler css");
    }
    await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);
}

example();