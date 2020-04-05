const mysql = require("mysql2/promise");
const {databaseCredentials} = require("../configuration");

module.exports = {
    executeQuery: async (query, params) => {
        const pool = await mysql.createPool(databaseCredentials);
        let poolQuery;
        try {
            poolQuery = await pool.query(query, params);
        } catch (errors) {
            console.log(errors);
        }
        finally {
            pool.end();
        }
        return poolQuery;
    }
};