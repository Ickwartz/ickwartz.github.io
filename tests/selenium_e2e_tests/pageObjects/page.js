const chrome = require("selenium-webdriver/chrome");

class Page {
    constructor() {
        let service = new chrome.ServiceBuilder("C:/Users/Schiffke/Documents/Ausbildung/Praxis/HiDriveFE/chromedriver.exe").build();
        let options = new chrome.Options();
        options.addArguments("start-maximized");
        this.driver = chrome.Driver.createSession(options, service);
    }

    async open(url) {
        await this.driver.get("http://localhost:8080" +url);
    }

    async quit() {
        await this.driver.quit();
    }

    exportDriver() {
        return this.driver;
    }
}

module.exports = Page;