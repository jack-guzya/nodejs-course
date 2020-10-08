const TABLES = {
  USERS: 'users',
  BOARDS: 'boards',
  COLUMNS: 'columns',
  TASKS: 'tasks'
};

const DB = {
  [TABLES.USERS]: [],
  [TABLES.BOARDS]: [],
  [TABLES.COLUMNS]: [],
  [TABLES.TASKS]: []
};

const getAll = table => [...DB[table]];

const get = table => id => DB[table].find(entity => entity.id === id);

const create = table => async entity => DB[table].push(entity);

module.exports = { TABLES, getAll, get, create };
