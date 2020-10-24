const { morgan, winston } = require('./config');
const middlewares = require('./middlewares');
const helper = require('./helpers');

module.exports = {
  info: winston.info.bind(winston),
  error: ({ message }) => winston.error(helper.formatError({ message })),
  middleware: {
    request: morgan(
      ':method :status [:response-time ms] \n url: :url \n query: :query \n body: :body',
      { stream: winston.stream }
    ),
    serverError: middlewares.serverError(winston.error),
    clientError: middlewares.clientError(winston.error)
  }
};
