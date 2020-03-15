const mysql = require("mysql2/promise");
const {databaseCredentials} = require("../configuration");

module.exports = {
    executeQuery: async (query, params) => {
        const pool = await mysql.createPool(databaseCredentials);
        return await pool.query(query, params);
    }
};