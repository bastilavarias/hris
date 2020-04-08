const db = require("../../../db");

module.exports = {
  create: async ({ url, publicId }) => {
    const query = `insert into photo (url, public_id)
                       values (?, ?);`;
    const params = [url, publicId];
    const result = await db.executeQuery(query, params);
    return result[0].insertId;
  },

  update: async (photoId, { url, publicId }) => {
    const query = `update photo
                       set url       = ?,
                           public_id = ?
                       where id = ?;`;
    const params = [url, publicId, photoId];
    await db.executeQuery(query, params);
  },

  getRaw: async photoId => {
    const query = `select id, url, public_id as publicId
                       from photo
                       where id = ?;`;
    const params = [photoId];
    const result = await db.executeQuery(query, params);
    return result[0][0] ? result[0][0] : {};
  }
};
