const db = require("../../db");

module.exports = {
    create: async (profileData) => {
        const query = `insert into profile (first_name, middle_name, last_name, extension, birth_date, birth_place, sex,
                                            civil_status, photo)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileData.firstName.toLowerCase(),
            profileData.middleName.toLowerCase(),
            profileData.lastName.toLowerCase(),
            profileData.extension.toLowerCase(),
            profileData.birthDate.toLowerCase(),
            profileData.birthPlace.toLowerCase(),
            profileData.sex.toLowerCase(),
            profileData.civilStatus.toLowerCase(),
            profileData.photo.toLowerCase()
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    }
};