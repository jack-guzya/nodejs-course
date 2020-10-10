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

const getEntryIndex = (table, id) =>
  DB[table].findIndex(entry => entry.id === id);

const getAll = async table => [...DB[table]];

const get = table => async id => {
  const entity = DB[table].find(item => item.id === id);

  return entity ? { ...entity } : null;
};

const create = table => async entity => {
  DB[table].push(entity);

  return entity;
};

const update = table => async (id, params) => {
  const index = getEntryIndex(table, id);

  if (index === -1) {
    return null;
  }
  console.log(params);
  DB[table][index] = { id, ...params };

  return DB[table][index] || null;
};

const deleteEntry = table => async id => {
  const index = getEntryIndex(table, id);

  if (index === -1) {
    return null;
  }

  const [entry] = DB[table].splice(index, 1);

  return entry;
};

module.exports = { TABLES, getAll, get, create, update, delete: deleteEntry };
