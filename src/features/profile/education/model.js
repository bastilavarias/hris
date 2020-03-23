const db = require("../../../db");

module.exports = {
    create: async (profileId, {level, schoolName, degree, yearFrom, yearTo, yearGraduated, recognition, scholarship}) => {
        const query = `insert into education (profile_id, level, degree, school_name, year_form, year_to,
                                              year_graduated, recognition, scholarship)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileId,
            level,
            degree,
            schoolName,
            yearFrom,
            yearTo,
            yearGraduated,
            recognition,
            scholarship
        ];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from education
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};