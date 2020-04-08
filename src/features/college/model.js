const db = require("../../db");

module.exports = {
  create: async ({ customId, name, description }) => {
    const query = `insert into college (custom_id, name, description)
                       values (?, ?, ?);`;
    const params = [
      customId.toLowerCase(),
      name.toLowerCase(),
      description.toLowerCase()
    ];
    await db.executeQuery(query, params);
  },

  update: async (collegeId, { name, description }) => {
    const query = `update college
                       set name        = ?,
                           description = ?
                       where id = ?;`;
    const params = [name.toLowerCase(), description.toLowerCase(), collegeId];
    await db.executeQuery(query, params);
  },

  getAll: async () => {
    const query = `select id, custom_id as customId, name, description
                       from college
                       where is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  search: async (option, value) => {
    const query = `select id, custom_id as customId, name, description
                       from college where ${option} like '%${value}%' and is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  getSingle: async collegeId => {
    const query = `select id, custom_id as customId, name, description
                       from college
                       where id = ?
                         AND is_deleted = ?;`;
    const params = [collegeId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  delete: async collegeId => {
    const query = `update college
                       set is_deleted = ?,
                           deleted_at = now()
                       where id = ?;`;
    const params = [true, collegeId];
    await db.executeQuery(query, params);
  }
};
