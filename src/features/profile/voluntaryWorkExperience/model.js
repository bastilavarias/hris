const db = require("../../../db");

module.exports = {
    create: async (profileId, {companyName, position, address, yearFrom, yearTo, hoursNumber}) => {
        const query = `insert into voluntary_work_experience (profile_id, company_name, position, address, year_from,
                                                              year_to, hours_number)
                       values (?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileId,
            companyName,
            position,
            address,
            yearFrom,
            yearTo,
            hoursNumber
        ];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from voluntary_work_experience
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};