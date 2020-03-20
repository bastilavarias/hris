const db = require("../../db");

module.exports = {
    create: async ({telephoneNumber, mobileNumber, emailAddress}) => {
        const query = `insert into contact (telephone_number, mobile_number, email_address) values (?,?,?);`;
        const params = [
            telephoneNumber,
            mobileNumber,
            emailAddress
        ];
        const result = await db.executeQuery(query, params);
        return result[0].insertId;
    }
};