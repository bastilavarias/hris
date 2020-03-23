const db = require("../../../db");

module.exports = {
    delete: async (referenceId) => {
        const query = `delete
                       from reference
                       where id = ?;`;
        const params = [referenceId];
        await db.executeQuery(query, params);
    }
};