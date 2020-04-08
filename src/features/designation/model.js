const db = require("../../db");

module.exports = {
  create: async ({ name, description }) => {
    const query = `insert into designation (name, description)
                       values (?, ?);`;
    const params = [name.toLowerCase(), description.toLowerCase()];
    await db.executeQuery(query, params);
  },

  update: async (designationId, { name, description }) => {
    const query = `update designation
                       set name        = ?,
                           description = ?
                       where id = ?;`;
    const params = [
      name.toLowerCase(),
      description.toLowerCase(),
      designationId
    ];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select id, name, description
                       from designation
                       where is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getSingle: async designationId => {
    const query = `select id, name, description
                       from designation
                       where id = ?
                         and is_deleted = ?;`;
    const params = [designationId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getSingleByName: async name => {
    const query = `select id, name, description
                       from designation
                       where name = ?
                         and is_deleted = ?;`;
    const params = [name, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  search: async (option, value) => {
    const query = `select id, name, description
                       from designation where ${option} like '%${value}%' and is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async designationId => {
    const query = `update designation
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
    const params = [true, designationId];
    await db.executeQuery(query, params);
  }
};
