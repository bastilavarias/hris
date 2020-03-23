const db = require("../../db");

module.exports = {
    create: async ({telephoneNumber, mobileNumber, emailAddress}) => {
        const query = `insert into contact (telephone_number, mobile_number, email_address)
                       values (?, ?, ?);`;
        const params = [
            telephoneNumber,
            mobileNumber,
            emailAddress
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    },

    update: async (contactId, {telephoneNumber, mobileNumber, emailAddress}) => {
        const query = `update contact
                       set telephone_number = ?,
                           mobile_number    = ?,
                           email_address    = ?
                       where id = ?;`;
        const params = [
            telephoneNumber,
            mobileNumber,
            emailAddress,
            contactId
        ];
        await db.executeQuery(query, params);
    }
};