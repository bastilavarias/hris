const db = require("./db");
const fs = require("fs");
const path = require("path");

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

    removeFile: (fileName, folder) => {
        try {
            const fileToDelete = path.join(__dirname, `/file/${folder}/${fileName}`);
            fs.unlinkSync(fileToDelete);
        } catch (errors) {
            console.log(errors);
        }
    },

    countTableRows: async (table) => {
        const query = `select count(id) as count from ${table.toLowerCase()};`;
        const params = [];
        const result = await db.executeQuery(query, params);
        return result[0][0] ? result[0][0].count : "999";
    }
};