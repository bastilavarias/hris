const db = require("../../db");

module.exports = {
  create: async name => {
    const query = `insert into year_level (name) values (?);`;
    const params = [name];
    await db.executeQuery(query, params);
  },

  update: async (yearLevelId, name) => {
    const query = `update year_level set name = ? where id =?;`;
    const params = [name, yearLevelId];
    await db.executeQuery(query, params);
  },

  getSingle: async yearLevelId => {
    const query = `select id, name from year_level where id = ? and is_deleted = ?;`;
    const params = [yearLevelId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getRawByName: async name => {
    const query = `select id, name, is_deleted as isDeleted from year_level where name = ?;`;
    const params = [name];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getAll: async () => {
    const query = `select id, name from year_level where is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async yearLevelId => {
    const query = `update year_level set is_deleted = ? where id =?;`;
    const params = [true, yearLevelId];
    await db.executeQuery(query, params);
  }
};
