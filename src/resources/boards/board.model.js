const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] }) {
    this.id = id;
    this.title = title;
    this.columns = columns.length
      ? columns.map(column => new Column(column))
      : [];
  }
}

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = { Board, Column };
