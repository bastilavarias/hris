const db = require("../../db");

module.exports = {
  create: async (buildingId, name) => {
    const query = `insert into room (building_id, name)
                       values (?, ?);`;
    const params = [buildingId, name];
    await db.executeQuery(query, params);
  },

  getSingle: async roomId => {
    const query = `select r.id,
                              r.name,
                              (select json_object('id', id, 'name', name)
                               from building
                               where id = r.building_id) as building
                       from room r
                       where r.id = ? && r.is_deleted = ?;`;
    const params = [roomId, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getSingleByName: async name => {
    const query = `select r.id,
                              r.name,
                              (select json_object('id', id, 'name', name)
                               from building
                               where id = r.building_id) as building
                       from room r
                       where r.name = ? && r.is_deleted = ?;`;
    const params = [name, false];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  },

  getAll: async () => {
    const query = `select r.id,
                              r.name,
                              (select json_object('id', id, 'name', name)
                               from building
                               where id = r.building_id) as building
                       from room r
                       where r.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  update: async (roomId, buildingId, name) => {
    const query = `update room
                       set building_id = ?,
                           name        = ?
                       where id = ?;`;
    const params = [buildingId, name, roomId];
    await db.executeQuery(query, params);
  },

  search: async (option, value) => {
    const query = `select r.id,
                              r.name,
                              (select json_object('id', id, 'name', name) from building where id = r.building_id) as building
                       from room r where r.${option} like r.'%${value}%' and r.is_deleted = ?;`;
    const params = [false];
    const result = await db.executeQuery(query, params);
    return result[0] ? result[0] : [];
  },

  delete: async roomId => {
    const query = `update room
                       set is_deleted = ?
                       where id = ?;`;
    const params = [true, roomId];
    await db.executeQuery(query, params);
  }
};
