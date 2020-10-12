module.exports = {
  isString(value, name) {
    if (typeof value !== 'string') {
      throw new Error(`The ${name} should be a string type`);
    }

    return this;
  },

  isNumber(value, name) {
    if (typeof value !== 'number') {
      throw new Error(`The ${name} should be a number type`);
    }

    return this;
  },

  isArray(array, name) {
    if (!Array.isArray(array)) {
      throw new Error(`The ${name} should be an array`);
    }

    return this;
  }
};
