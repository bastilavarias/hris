const db = require("../../db");

module.exports = {
    create: async ({benefitId, contactId, addressId, familyId, governmentIdId}, profile) => {
        const query = `insert into profile (benefit_id, contact_id, address_id, family_id, government_id_id, first_name,
                                            middle_name, last_name, extension, birth_date, birth_place, sex,
                                            civil_status, blood_type, height, weight, photo)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            benefitId,
            contactId,
            addressId,
            familyId,
            governmentIdId,
            profile.firstName,
            profile.middleName,
            profile.lastName,
            profile.extension,
            profile.birthDate,
            profile.birthPlace,
            profile.sex,
            profile.civilStatus,
            profile.bloodType,
            profile.height,
            profile.weight,
            profile.photo,
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    },


    addCitizenship: async (profileId, name) => {
        const query = `insert into citizenship (profile_id, name)
                       values (?, ?);`;
        const params = [profileId, name];
        await db.executeQuery(query, params);
    }
};