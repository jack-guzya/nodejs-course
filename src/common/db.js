const TABLES = {
  USERS: 'users',
  BOARDS: 'boards',
  TASKS: 'tasks'
};

const DB = {
  [TABLES.USERS]: [],
  [TABLES.BOARDS]: [],
  [TABLES.TASKS]: []
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const getEntityIndex = (table, id) =>
  DB[table].findIndex(entry => entry.id === id);

const getAll = async table => deepCopy(DB[table]);

const get = table => async id => {
  const entity = DB[table].find(item => item.id === id);

  return entity ? deepCopy(entity) : null;
};

const create = table => async entity => {
  DB[table].push(entity);

  return entity;
};

const update = table => async (id, params) => {
  const index = getEntityIndex(table, id);

  if (index === -1) {
    return null;
  }

  DB[table][index] = { ...DB[table][index], ...params };

  return deepCopy(DB[table][index]) || null;
};

const deleteEntry = table => async id => {
  const index = getEntityIndex(table, id);

  if (index === -1) {
    return null;
  }

  const [entry] = DB[table].splice(index, 1);

  return entry;
};

const find = table => async callback => deepCopy(DB[table].filter(callback));

module.exports = {
  TABLES,
  getAll,
  get,
  create,
  update,
  delete: deleteEntry,
  find
};
