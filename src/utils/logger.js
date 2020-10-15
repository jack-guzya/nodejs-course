const { createLogger, format, transports } = require('winston');
const { finished } = require('stream');
const { combine, printf } = format;

const isEmpty = obj => typeof obj === 'object' && !Object.entries(obj).length;
const formatObj = obj => (isEmpty(obj) ? '-' : JSON.stringify(obj));

const customFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
);

const logger = createLogger({
  format: format.colorize({
    all: true,
    colors: { info: 'green', error: 'red' }
  }),
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
        customFormat
      )
    })
  ]
});

const requestLogger = (req, res, next) => {
  const { url, method } = req;
  const query = formatObj(req.query);
  const body = formatObj(req.body);
  const start = Date.now();

  finished(res, () => {
    const { statusCode } = res;
    const ms = Date.now() - start;

    logger.info(
      `${method} ${statusCode} [${ms}ms] \n${url} \nquery: ${query} \nbody: ${body}\n`
    );
  });

  next();
};

const requestErrorLogger = (err, req, res, next) => {
  const { statusCode, message } = err;

  logger.error(`${req.method} ${statusCode}\n${message}\n`);

  next(err);
};

module.exports = { request: requestLogger, requestError: requestErrorLogger };
