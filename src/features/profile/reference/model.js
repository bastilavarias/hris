const db = require("../../../db");

module.exports = {
    create: async (profileId, {name, address, contactNumber}) => {
        const query = `insert into reference (profile_id, name, address, contact_number)
                       values (?, ?, ?, ?);`;
        const params = [profileId, name, address, contactNumber];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from reference
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};