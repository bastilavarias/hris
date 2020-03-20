const db = require("../../db");

module.exports = {
    create: async ({gsisId, pagibigId, philhealthId, sssNumber, tinNumber, agencyEmployeeNumber}) => {
        const query = `insert into benefit (gsis_id, pagibig_id, philhealth_id, sss_number, tin_number, agency_employee_number) values (?,?,?,?,?,?) ;`;
        const params = [
            gsisId ? gsisId : null,
            pagibigId ? gsisId : null,
            philhealthId ? gsisId : null,
            sssNumber ? gsisId : null,
            tinNumber ? gsisId : null,
            agencyEmployeeNumber ? gsisId : null
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    }
};