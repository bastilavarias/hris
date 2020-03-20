const db = require("../../db");

module.exports = {
    create: async ({spouse, father, mother}) => {
        const query = `insert into family (spouse_first_name, spouse_middle_name, spouse_last_name, spouse_extension,
                                           father_first_name, father_middle_name, father_last_name, father_extension,
                                           mother_first_name, mother_middle_name, mother_last_name, mother_extension)
                       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            spouse.firstName,
            spouse.middleName,
            spouse.lastName,
            spouse.extension,
            father.firstName,
            father.middleName,
            father.lastName,
            father.extension,
            mother.firstName,
            mother.middleName,
            mother.lastName,
            mother.extension,
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    },

    addChild: async (familyId, {name, birthDate}) => {
        const query = `insert into child (family_id, name, birthDate) values (?, ?, ?);`;
        const params = [familyId, name, birthDate];
        await db.executeQuery(query, params);
    }
};