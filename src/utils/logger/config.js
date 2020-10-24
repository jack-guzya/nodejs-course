const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const helper = require('./helpers');
const { combine, printf, colorize } = format;

morgan.token('body', req => helper.hidePassword(JSON.stringify(req.body)));
morgan.token('query', req => JSON.stringify(req.query));

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    handleRejections: true,
    format: combine(
      colorize({
        all: true,
        colors: { info: 'green', error: 'red' }
      }),
      printf(helper.formatLog)
    )
  },

  errorFile: {
    filename: './logs/error.log',
    handleExceptions: true,
    handleRejections: true,
    level: 'error',
    maxsize: 5242880,
    format: printf(helper.formatLog)
  },

  infoFile: {
    filename: './logs/info.log',
    handleExceptions: true,
    handleRejections: true,
    level: 'info',
    maxsize: 5242880,
    format: printf(helper.formatLog)
  }
};

const winston = createLogger({
  format: format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.errorFile),
    new transports.File(options.infoFile)
  ]
});

winston.stream = {
  write(message) {
    winston.info(message);
  }
};

module.exports = {
  morgan,
  winston
};
