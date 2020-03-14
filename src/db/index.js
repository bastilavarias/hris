const mysql = require("mysql2/promise");
const {databaseCredentials} = require("../configuration");

module.exports = {
    executeQuery: async (query, params) => {
        const connection = await mysql.createConnection(databaseCredentials);
        return await connection.execute(query, params);
    }
};