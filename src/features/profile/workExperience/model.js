const db = require("../../../db");

module.exports = {
    create: async (profileId, {companyName, position, yearFrom, yearTo, monthlySalary, isFullTime, isGovernmentService}) => {
        const query = `insert into work_experience (profile_id, company_name, position, year_from, year_to,
                                                    monthly_salary, is_full_time, is_government_service)
                       values (?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileId,
            companyName,
            position,
            yearFrom,
            yearTo,
            monthlySalary,
            isFullTime,
            isGovernmentService
        ];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from work_experience
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};