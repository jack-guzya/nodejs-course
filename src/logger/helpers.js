class FileTransport {
  constructor({ level, format, fileName, maxsize = 5242880, maxFiles = 5 }) {
    this.filename = `./logs/${fileName || level}.log`;
    this.level = level;
    this.format = format;
    this.maxsize = maxsize;
    this.maxFiles = maxFiles;
  }
}

const formatError = ({ message }) => `Error: ${message}\n`;

const formatLog = ({ level, message, timestamp }) =>
  `${timestamp} [${level}]: ${message}`;

const hidePassword = str =>
  str.replace(/(?<="password":").+(?=")/, pass => '*'.repeat(pass.length));

module.exports = {
  formatError,
  formatLog,
  hidePassword,
  FileTransport
};
