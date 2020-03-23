const db = require("../../../db");

module.exports = {
    create: async (profileId, name) => {
        const query = `insert into hobby (profile_id, name)
                       values (?, ?);`;
        const params = [
            profileId,
            name
        ];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from hobby
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};