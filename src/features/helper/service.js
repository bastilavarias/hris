const helperModel = require("./model");

const helperService = {
  getRaw: async (tableName, targetColumn, whereValue) =>
    await helperModel.getRaw(tableName, targetColumn, whereValue),
};

module.exports = helperService;
