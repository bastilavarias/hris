const db = require("../../db");

module.exports = {
    create: async (profileData) => {
        const query = `insert into profile (first_name, middle_name, last_name, extension, birth_date, birth_place, sex,
                                            civil_status, blood_type, height, weight, photo)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            profileData.firstName.toLowerCase(),
            profileData.middleName.toLowerCase(),
            profileData.lastName.toLowerCase(),
            profileData.extension.toLowerCase(),
            profileData.birthDate,
            profileData.birthPlace,
            profileData.sex,
            profileData.civilStatus,
            profileData.bloodType,
            profileData.height,
            profileData.weight,
            profileData.photo
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    }
};