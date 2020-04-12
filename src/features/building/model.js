const db = require("../../db");

module.exports = {
  create: async name => {
    const query = `insert into building (name) values (?);`;
    const params = [name];
    await db.executeQuery(query, params);
  },

  getSingle: async buildingId => {
    const query = `select id, name from building where id = ?;`;
    const params = [buildingId];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getSingleByName: async name => {
    const query = `select id, name from building where name = ? && is_deleted = ?;`;
    const params = [name, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getAll: async () => {
    const query = `select id, name from building where is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  update: async (buildingId, name) => {
    const query = `update building set name = ? where id = ?;`;
    const params = [name, buildingId];
    await db.executeQuery(query, params);
  },

  search: async (option, value) => {
    const query = `select id, name
                       from building where ${option} like '%${value}%' and is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async buildingId => {
    const query = `update building set is_deleted = ? where id = ?;`;
    const params = [true, buildingId];
    await db.executeQuery(query, params);
  }
};
