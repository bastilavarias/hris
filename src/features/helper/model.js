const knex = require("../../db/knex");

const helperModel = {
  getRaw: (tableName, targetColumn, whereValue) => {
    return knex(tableName)
      .select("*")
      .where(targetColumn, whereValue)
      .then((rawAccountArray) => {
        if (rawAccountArray.length > 0) return rawAccountArray[0];
        return {};
      });
  },
};

module.exports = helperModel;
