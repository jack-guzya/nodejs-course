const { createLogger, format, transports } = require('winston');
const { finished } = require('stream');
const { combine, printf, colorize } = format;

const helpers = {
  hideObjValues: (obj, keys) => {
    if (typeof obj !== 'object' || !keys.length) {
      return obj;
    }

    const isKey = key => !!keys.find(item => item === key);
    const hide = value => '*'.repeat(value.length);
    const handleEntries = ([key, value]) =>
      isKey(key) ? [key, hide(value)] : [key, value];
    const entries = Object.entries(obj).map(handleEntries);

    return Object.fromEntries(entries);
  },

  formatObj(obj, ...hiddenKeys) {
    return JSON.stringify(this.hideObjValues(obj, hiddenKeys));
  },

  formatError: ({ message }) => `Error: ${message}\n`,

  formatLog: ({ level, message, timestamp }) =>
    `${timestamp} [${level}]: ${message}`
};

const options = {
  console: {
    level: 'info',
    format: combine(
      colorize({
        all: true,
        colors: { info: 'green', error: 'red' }
      }),
      printf(helpers.formatLog)
    )
  },

  errorFile: {
    filename: './logs/error.log',
    level: 'error',
    maxsize: 5242880,
    format: printf(helpers.formatLog)
  },

  infoFile: {
    filename: './logs/info.log',
    level: 'info',
    maxsize: 5242880,
    format: printf(helpers.formatLog)
  }
};

const logger = createLogger({
  format: format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.errorFile),
    new transports.File(options.infoFile)
  ]
});

const middleware = {
  request: (req, res, next) => {
    const { url, method } = req;
    const query = helpers.formatObj(req.query);
    const body = helpers.formatObj(req.body, 'password');
    const start = Date.now();

    finished(res, () => {
      const { statusCode } = res;
      const ms = Date.now() - start;

      logger.info(
        `${method} ${statusCode} [${ms}ms] \nUrl: ${url} \nQuery: ${query} \nBody: ${body}\n`
      );
    });

    next();
  },

  serverError: (err, req, res, next) => {
    if (err.statusCode) {
      return next(err);
    }

    logger.error(`${req.method} ${req.url}\n${helpers.formatError(err)}\n`);

    next(err);
  },

  clientError: (err, req, res, next) => {
    if (!err.statusCode) {
      return next(err);
    }

    const { statusCode, message } = err;
    logger.error(`${req.method} ${statusCode}\nUrl: ${req.url}\n${message}\n`);

    next(err);
  }
};

module.exports = {
  middleware,
  error: ({ message }) => logger.error(helpers.formatError({ message })),
  info: logger.info.bind(logger)
};
