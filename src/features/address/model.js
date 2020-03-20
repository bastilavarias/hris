const db = require("../../db");

module.exports = {
    create: async ({permanent, residential}) => {
        const query = `insert into address (permanent_house_number, permanent_street, permanent_subdivision,
                                            permanent_barangay, permanent_city, permanent_province, permanent_zip_code,
                                            residential_house_number, residential_street, residential_subdivision,
                                            residential_barangay, residential_city, residential_province,
                                            residential_zip_code)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            permanent.houseNumber,
            permanent.street,
            permanent.subdivision,
            permanent.barangay,
            permanent.city,
            permanent.province,
            permanent.zipCode,
            residential.houseNumber,
            residential.street,
            residential.subdivision,
            residential.barangay,
            residential.city,
            residential.province,
            residential.zipCode
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    }
};