const winston = require("winston");

// https://www.section.io/engineering-education/logging-with-winston/
// Levels: {error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5}
class Logger {
    constructor() {}

    systemLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "warn"
            }),

            new winston.transports.File({
                level: "warn",
                filename: "./logs/systemlogs.log"
            })
        ],
        format: winston.format.combine(
            winston.format.timestamp({
                format: "DD-MM-YYYY HH:MM:SS"
            }),
            winston.format.printf(log => `${[log.timestamp]}: ${log.level}: ${log.message}`)
        )
    });

    eventLogger = winston.createLogger({
        transports: [
            // dev
            new winston.transports.Console({
                level: "info"
            }),

            new winston.transports.File({
                level: "info",
                filename: "./logs/eventlogs.log"
            })
        ],
        format: winston.format.combine(
            winston.format.timestamp({
                format: "DD-MM-YYYY HH:MM:SS"
            }),
            winston.format.printf(log => `${[log.timestamp]}: ${log.level}: ${log.message}`)
        )
    });

    serverLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "info"
            }),
            /*
            new winston.transports.File({
                level: "info",
                filename: "./logs/serverlogs.log"
            })*/
        ],
        format: winston.format.combine(
            winston.format.timestamp({
                format: "DD-MM-YYYY HH:MM:SS"
            }),
            winston.format.printf(log => `${[log.timestamp]}: ${log.level}: ${log.message}`)
        )
    });

    dbLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "info"
            }),
            /*
            new winston.transports.File({
                level: "info",
                filename: "./logs/databaselogs.log"
            })*/
        ],
        format: winston.format.combine(
            winston.format.timestamp({
                format: "DD-MM-YYYY HH:MM:SS"
            }),
            winston.format.printf(log => `${[log.timestamp]}: ${log.level}: ${log.message}`)
        )
    });

    debugLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "debug"
            })
        ],
        format: winston.format.printf(log => `DEBUG: ${log.message}`)
    });

    debug(msg) {
        this.debugLogger.debug(msg);
    }
}

const logger = new Logger();

module.exports = logger;