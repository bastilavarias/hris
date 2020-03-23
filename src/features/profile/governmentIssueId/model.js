const db = require("../../../db");

module.exports = {
    create: async ({governmentId, licenseNumber, issuanceDate, issuancePlace}) => {
        const query = `insert into government_issue_id (government_id, licence_number, issuance_date, issuance_place)
                       values (?, ?, ?, ?);`;
        const params = [
            governmentId,
            licenseNumber,
            issuanceDate,
            issuancePlace
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    },

    update: async (governmentIssueIdId, {governmentId, licenseNumber, issuanceDate, issuancePlace}) => {
        const query = `update government_issue_id
                       set government_id  = ?,
                           licence_number = ?,
                           issuance_date  = ?,
                           issuance_place = ?
                       where id = ?;`;
        const params = [
            governmentId,
            licenseNumber,
            issuanceDate,
            issuancePlace,
            governmentIssueIdId
        ];
        await db.executeQuery(query, params);
    }
};