const db = require("../../../db");

module.exports = {
    create: async (profileId, {programTitle, dateFrom, dateTo, hoursNumber, type, sponsor}) => {
        const query = `insert into training (profile_id, program_title, date_from, date_to, hours_number, type,
                                             sponsor)
                       values (?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileId,
            programTitle,
            dateFrom,
            dateTo,
            hoursNumber,
            type,
            sponsor
        ];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from training
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};