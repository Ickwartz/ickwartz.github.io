const morgan = require("morgan");

const Logger = require("./winstonLogger");

// Override the stream to winston logger
const stream = {
  write: (message) => Logger.serverLogger.info(message),
};

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
     { stream }
     );

module.exports = morganMiddleware;
