const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns }) {
    this.id = id;
    this.title = title;
    this.columns = columns ? columns.map(column => new Column(column)) : [];
  }

  add(column) {
    this.columns.push(new Column(column));
  }

  delete(id) {
    const index = this.columns.findIndex(column => column.id === id);

    if (index === -1) {
      return null;
    }

    const [column] = this.columns.splice(index, 1);

    return column;
  }
}

class Column {
  constructor({ id = uuid(), title = 'BOARD', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = { Board, Column };
