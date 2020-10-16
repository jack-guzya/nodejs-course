const { createLogger, format, transports } = require('winston');
const { finished } = require('stream');
const { combine, printf, colorize } = format;

const isEmpty = obj => typeof obj === 'object' && !Object.entries(obj).length;
const formatObj = obj => (isEmpty(obj) ? '-' : JSON.stringify(obj));
const formatError = ({ message }) => `Error: ${message}`;

const customFormatLog = ({ level, message, timestamp }) =>
  `${timestamp} [${level}]: ${message}`;

const formatConsoleLog = () =>
  combine(
    colorize({
      all: true,
      colors: { info: 'green', error: 'red' }
    }),
    printf(customFormatLog)
  );

const logger = createLogger({
  format: format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
  transports: [
    new transports.Console({
      level: 'info',
      format: formatConsoleLog()
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: printf(customFormatLog)
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: printf(customFormatLog)
    })
  ]
});

const loggerMiddleware = (req, res, next) => {
  const { url, method } = req;
  const query = formatObj(req.query);
  const body = formatObj(req.body);
  const start = Date.now();

  finished(res, () => {
    const { statusCode } = res;
    const ms = Date.now() - start;

    logger.info(
      `${method} ${statusCode} [${ms}ms] \nUrl: ${url} \nQuery: ${query} \nBody: ${body}\n`
    );
  });

  next();
};

const serverErrorMiddleware = (err, req, res, next) => {
  if (err.statusCode) {
    return next(err);
  }

  logger.error(`${req.method} ${req.url}\n${formatError(err)}\n`);

  next(err);
};

const clientErrorMiddleware = (err, req, res, next) => {
  if (!err.statusCode) {
    return next(err);
  }

  const { statusCode, message } = err;
  logger.error(`${req.method} ${statusCode}\nUrl: ${req.url}\n${message}\n`);

  next(err);
};

module.exports = {
  log: loggerMiddleware,
  logServerError: serverErrorMiddleware,
  logClientError: clientErrorMiddleware,
  error: logger.error.bind(logger),
  formatError
};
