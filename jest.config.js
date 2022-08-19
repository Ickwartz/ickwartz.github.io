const {defaults} = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/"
  },
  setupFilesAfterEnv: ["./jest-setup.js"],
  moduleNameMapper: {
    "@logger": "<rootDir>/utils/winstonLogger.js"
  }
};
