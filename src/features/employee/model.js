const db = require("../../db");

module.exports = {
    create: async ({employeeNumber, departmentId, designationId, isFullTime, profileId}) => {
        const query = `insert into employee (department_id, designation_id, profile_id, employee_number, is_full_time)
                       values (?, ?, ?, ?, ?);`;
        const params = [
            departmentId,
            designationId,
            profileId,
            employeeNumber,
            isFullTime
        ];
        await db.executeQuery(query, params);
    }
};