const db = require("./db");

module.exports = {
    checkIfExists: async (tableName, option, value) => {
        const query = `select exists(select true from ${tableName} where ${option} = ? and is_deleted = ?) as "isExists";`;
        const params = [
            value,
            false
        ];
        const result = await db.executeQuery(query, params);
        return result[0][0].isExists ? result[0][0].isExists : false;
    },


    countTableRows: async (table) => {
        const query = `select count(id) as count from ${table.toLowerCase()};`;
        const params = [];
        const result = await db.executeQuery(query, params);
        return result[0][0] ? result[0][0].count : "999";
    }

};