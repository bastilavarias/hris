const db = require("../../db");

module.exports = {
  create: async ({ name, isCurrent }) => {
    const query = `insert into semester (name, is_current) values (?, ?);`;
    const params = [name, isCurrent];
    await db.executeQuery(query, params);
  },

  update: async (semesterId, { name, isCurrent }) => {
    const query = `update semester set name = ?, is_current = ? where id = ?;`;
    const params = [name, isCurrent, semesterId];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select id, name, is_current as isCurrent from semester where is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getCurrent: async () => {
    const query = `select id, name, is_current as isCurrent from semester where is_current = ?;`;
    const params = [true];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  activate: async semesterId => {
    const query = `update semester set is_current = ? where id= ?;`;
    const params = [true, semesterId];
    await db.executeQuery(query, params);
  },

  delete: async semesterId => {
    const query = `update semester set is_deleted = ? where id = ?;`;
    const params = [true, semesterId];
    await db.executeQuery(query, params);
  }
};
