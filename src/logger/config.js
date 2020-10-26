const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const helper = require('./helpers');
const { combine, printf, colorize } = format;
const { NODE_ENV } = require('../common/config');

morgan.token('body', req => helper.hidePassword(JSON.stringify(req.body)));
morgan.token('query', req => JSON.stringify(req.query));

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    handleRejections: true,
    format: colorize({
      all: true,
      colors: { info: 'green', error: 'red' }
    })
  },

  errorFile: new helper.FileTransport({
    level: 'error'
  }),

  infoFile: new helper.FileTransport({
    level: 'info'
  }),

  exceptionFile: new helper.FileTransport({
    fileName: 'exception'
  }),

  rejectionFile: new helper.FileTransport({
    fileName: 'rejection'
  })
};

const winston = createLogger({
  format: combine(
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
    printf(helper.formatLog)
  ),
  transports: [
    new transports.File(options.errorFile),
    new transports.File(options.infoFile)
  ],
  exceptionHandlers: [new transports.File(options.exceptionFile)],
  rejectionHandlers: [new transports.File(options.rejectionFile)]
});

if (NODE_ENV === 'development') {
  winston.add(new transports.Console(options.console));
}

winston.stream = {
  write(message) {
    winston.info(message);
  }
};

module.exports = {
  morgan,
  winston
};
