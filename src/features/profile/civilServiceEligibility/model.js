const db = require("../../../db");

module.exports = {
    create: async (profileId, {licenseTitle, rating, licenseNumber, validityDate, examinationDate, examinationPlace}) => {
        const query = `insert into civil_service_eligibility (profile_id, license_title, rating, examination_date,
                                                              examination_place, license_number, validity_date)
                       values (?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileId,
            licenseTitle,
            rating,
            examinationDate,
            examinationPlace,
            licenseNumber,
            validityDate
        ];
        await db.executeQuery(query, params);
    },

    delete: async (profileId) => {
        const query = `delete
                       from civil_service_eligibility
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    }
};