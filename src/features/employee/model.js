const db = require("../../db");

module.exports = {
    create: async ({employeeNumber, designationId, profileId}) => {
        const query = `insert into employee (designation_id, profile_id, employee_number)
                       values (?, ?, ?);`;
        const params = [
            designationId,
            profileId,
            employeeNumber
        ];
        await db.executeQuery(query, params);
    }
};