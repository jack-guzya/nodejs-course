const formatError = ({ message }) => `Error: ${message}\n`;

const formatLog = ({ level, message, timestamp }) =>
  `${timestamp} [${level}]: ${message}`;

const hidePassword = str =>
  str.replace(/(?<="password":").+(?=")/, pass => '*'.repeat(pass.length));

module.exports = {
  formatError,
  formatLog,
  hidePassword
};
