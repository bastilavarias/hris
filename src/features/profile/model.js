const db = require("../../db");

module.exports = {
    create: async ({benefitId, contactId, addressId, familyId, governmentIssueIdId, photoId}, profile) => {
        const query = `insert into profile (benefit_id, contact_id, address_id, family_id, government_issue_id_id,
                                            photo_id, first_name,
                                            middle_name, last_name, extension, birth_date, birth_place, sex,
                                            civil_status, blood_type, height, weight)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            benefitId,
            contactId,
            addressId,
            familyId,
            governmentIssueIdId,
            photoId,
            profile.firstName.toLowerCase(),
            profile.middleName.toLowerCase(),
            profile.lastName.toLowerCase(),
            profile.extension.toLowerCase(),
            profile.birthDate,
            profile.birthPlace,
            profile.sex,
            profile.civilStatus,
            profile.bloodType,
            profile.height,
            profile.weight
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    },


    addCitizenship: async (profileId, name) => {
        const query = `insert into citizenship (profile_id, name)
                       values (?, ?);`;
        const params = [profileId, name];
        await db.executeQuery(query, params);
    },

    deleteCitizenship: async (profileId) => {
        const query = `delete
                       from citizenship
                       where profile_id = ?;`;
        const params = [profileId];
        await db.executeQuery(query, params);
    },

    update: async (profileId, {firstName, middleName, lastName, extension, birthDate, birthPlace, sex, civilStatus, bloodType, height, weight}) => {
        const query = `update profile
                       set first_name   = ?,
                           middle_name  = ?,
                           last_name    = ?,
                           extension    = ?,
                           birth_date   = ?,
                           birth_place  = ?,
                           sex          = ?,
                           civil_status = ?,
                           blood_type   = ?,
                           height       = ?,
                           weight       = ?
                       where id = ?;`;
        const params = [
            firstName,
            middleName,
            lastName,
            extension,
            birthDate,
            birthPlace,
            sex,
            civilStatus,
            bloodType,
            height,
            weight,
            profileId
        ];
        await db.executeQuery(query, params);
    },

    getRaw: async (profileId) => {
        const query = `select id,
                              benefit_id             as benefitId,
                              contact_id             as contactId,
                              address_id             as addressId,
                              family_id              as familyId,
                              government_issue_id_id as governmentIssueIdId,
                              photo_id               as photoId,
                              first_name,
                              middle_name,
                              last_name,
                              extension,
                              birth_date,
                              birth_place,
                              sex,
                              civil_status,
                              blood_type,
                              height,
                              weight,
                              created_at,
                              is_deleted,
                              deleted_at
                       from profile
                       where id = ?;`;
        const params = [profileId];
        const results = await db.executeQuery(query, params);
        return results[0][0] ? results[0][0] : {};
    }
};