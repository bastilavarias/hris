const employeeModel = require("./model");
const profileModel = require("../profile/model");
const helper = require("../../helper");

module.exports = {
    create: async ({employeeNumber, designationId, profile}) => {
        let errors = [];
        let message = "";
        const isEmployeeExists = await helper.checkIfExists("employee", "employee_number", employeeNumber.toLowerCase());
        if (isEmployeeExists) {
            errors.push("Employee number was already used.");
            return {
                message,
                errors
            };
        }
        const createdProfileID = await profileModel.create(profile);
        await employeeModel.create({employeeNumber, designationId, profileId: createdProfileID});
        message = "New employee is created.";
        return {
            errors,
            message
        };
    }
};